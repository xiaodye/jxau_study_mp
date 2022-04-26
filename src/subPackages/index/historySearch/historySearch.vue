<template>
  <view class="search">
    <!-- 搜索条 -->
    <view class="search-bar">
      <u-search
        v-model="key"
        :clearabled="true"
        focus
        placeholder="请输入关键字"
        @search="searchHandler"
        @custom="searchHandler"
      ></u-search>
    </view>

    <!-- 历史搜索 -->
    <view class="search-history">
      <view class="search-history-header">
        <view class="title">最近搜索</view>
        <view class="icon-del" @click="deleteAllHistoryRecords">
          <u-icon name="trash" :size="rpxToPx(50)"></u-icon>
        </view>
      </view>
      <view class="search-history-tags">
        <my-tag class="search-history-tags-item" type="info" v-for="(item, index) in historyRecords" :key="index">
          {{ item }}
        </my-tag>
      </view>
    </view>

    <!-- 热门文章 -->
    <view class="search-hot">
      <view class="search-hot-header">
        <u-icon name="wifi" :size="rpxToPx(50)" color="#f56c6c"></u-icon>
        <view class="title">热门文章</view>
      </view>

      <!-- 文章列表 -->
      <view class="article-list">
        <view class="article-list-item" v-for="(item, index) in articleList" :key="index">
          <my-tag class="tag" :circle="false" size="mini" :type="getTagColor(index + 1)">{{ index + 1 }}</my-tag>
          <view class="article-title u-line-1">{{ item }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    key: "",
    historyRecords: null,
    pageRecords: new Set(),
    articleList: [
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
      "来自南方的温柔的风，经不起北方的寒冷。 --最爱你的十年",
    ],
  }),
  computed: {
    getTagColor() {
      return index => {
        if (index === 1) {
          return "error"
        } else if (index === 2) {
          return "warning"
        } else if (index === 3) {
          return "primary"
        } else {
          return "info"
        }
      }
    },
  },
  methods: {
    // 获取历史记录
    getHistoryRecords() {
      if (uni.getStorageSync("historyRecords")) {
        this.historyRecords = JSON.parse(uni.getStorageSync("historyRecords"))
      } else {
        this.historyRecords = []
      }
    },

    // 搜索处理函数
    searchHandler(keyword) {
      if (keyword.trim().length) {
        if (this.historyRecords.includes(keyword)) this.historyRecords = this.historyRecords.filter(item => item !== keyword)
        this.historyRecords.unshift(keyword)
        uni.setStorageSync("historyRecords", JSON.stringify(this.historyRecords))

        uni.navigateTo({ url: "/subPackages/index/searchPage/searchPage?key=" + keyword })
        this.key = ""
      }
    },

    // 删除全部历史记录
    async deleteAllHistoryRecords() {
      const { confirm } = await uni.showModal({ title: "提示", content: "是否删除全部历史记录" })
      if (confirm) {
        this.historyRecords = []
        uni.removeStorageSync("historyRecords")
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getHistoryRecords()
  },
}
</script>

<style lang="scss" scoped>
.search {
  min-height: 100vh;
  box-sizing: border-box;
  // background-color: $uni-bg-color-grey;

  &-bar {
    padding: 20rpx;
    padding-top: 0;
    // background-color: #fff;
  }

  &-history {
    // background-color: #fff;
    padding: 20rpx;
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-tags {
      margin-top: 20rpx;
      display: flex;
      flex-wrap: wrap;
      &-item {
        margin: 10rpx;
      }
    }
  }

  &-hot {
    margin-top: 40rpx;
    padding: 20rpx;

    &-header {
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;

      .title {
        margin-left: 20rpx;
      }
    }

    .article-list {
      padding-left: 20rpx;
      padding-right: 100rpx;
      &-item {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;

        .tag {
          margin-right: 10rpx;
          width: 100rpx;
        }
        .article-title {
          color: $uni-color-subtitle;
          font-size: 30rpx;
        }
      }
    }
  }

  .title {
    font-size: 36rpx;
    color: $uni-color-subtitle;
    font-weight: bold;
  }
}
</style>

