<template>
  <view class="question-cate-detail">
    <!-- 页面头部 -->
    <view class="cate-header" :style="{ paddingTop: navHeight + 'px', backgroundImage: categoryConfig.bgColor }">
      <!-- 描述 -->
      <view class="cate-header-desc">
        <view class="t-icon" :class="[categoryConfig.icon]"></view>

        <view class="cate-header-desc-rg">
          <view class="title">{{ categoryConfig.headLine }}</view>
          <view class="content">{{ categoryConfig.desc }}</view>
        </view>
      </view>

      <!-- 头部白框 -->
      <view class="cate-header-title">
        <view class="cate-header-title-tip">题组列表</view>
        <view class="cate-header-title-search">
          <u-search placeholder="搜索题目" :showAction="false" :height="rpxToPx(50)" clearabled></u-search>
        </view>
      </view>
    </view>

    <!-- 主体 -->
    <view class="cate-main">
      <question-list :questionList="questionList" ref="questionList"></question-list>

      <!-- 加载更多 -->
      <u-loadmore :status="status" loadingText="一大波题目正在赶来" nomoreText="~没有更多了~" />
    </view>
  </view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { questionList } from "@/mock/questionList.js"
import categories from "./categories.js"
export default {
  components: {},
  mixins: [systemInfo],
  data: () => ({
    key: "race",
    categoryConfig: null,
    questionList: questionList,
    status: "loadmore",

    totalPages: 5,
    paramData: {
      currentPage: 1,
      pageSize: 8,
    },
  }),
  computed: {},
  methods: {
    pageInit(key) {
      this.key = key
      this.categoryConfig = categories[this.key]
    },

    // 获取题组列表
    async getQuestionGroupList() {
      const { data: res } = await uni.request({
        url: "/question/get/set/information",
        method: "GET",
        data: { level: this.categoryConfig.level, currentPage: this.paramData.currentPage, pageSize: this.paramData.pageSize },
      })
      console.log(res)
      if (res.status !== "200") return uni.$u.toast("获取题组列表失败")
      this.questionList = res.data.list
      this.totalPages = res.data.pages
    },

    // 加载更多
    async loadMore() {
      // 节流
      if (this.status === "loading" || this.status === "nomore") return

      // 获取数组
      this.paramData.currentPage++
      try {
        const { data: res } = await uni.request({
          url: "/question/get/set/information",
          method: "GET",
          data: { level: this.categoryConfig.level, currentPage: this.paramData.currentPage, pageSize: this.paramData.pageSize },
        })
        console.log(res)
        if (res.status !== "200") return uni.$u.toast("下拉加载失败")

        this.questionList = [...this.questionList, ...res.data.list]

        // 判断是否还有数据
        if (this.paramData.currentPage >= this.totalPages) return (this.status = "nomore")
        this.status = "loadmore"
      } catch (err) {
        console.error(err)
        uni.$u.toast("请求异常")
        this.status = "loadmore"
      }
    },
  },
  watch: {},

  onLoad(options) {
    this.pageInit(options.key)
    this.getQuestionGroupList()
  },

  // 监听下拉触底
  onReachBottom() {
    this.loadMore()
    // 节流
    // if (this.status === "loading" || this.status === "nomore") return

    // this.status = "loading"
    // setTimeout(() => {
    //   this.status = "nomore"
    // }, 2000)
  },
}
</script>

<style lang="scss">
view {
  box-sizing: border-box;
}

@mixin fixed() {
  position: fixed;
  top: 0;
  left: 0;
}

$header: 500rpx;
$header_title: 100rpx;

.question-cate-detail {
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
}

.cate-header {
  @include fixed();
  z-index: 99;

  height: $header;
  display: flex;
  flex-direction: column;
  // background-image: linear-gradient(to bottom, #fa709a 0%, #fee140 100%);
  // background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  // background-image: linear-gradient(to bottom, #43e97b 0%, #38f9d7 100%);

  &-desc {
    flex: 1;
    padding: 0 20rpx;
    display: flex;
    align-items: center;
    .t-icon {
      margin-right: 40rpx;
    }
    .t-icon-race {
      width: 200rpx;
      height: 200rpx;
    }
    .t-icon-algo {
      width: 180rpx;
      height: 180rpx;
    }
    .t-icon-advance {
      width: 160rpx;
      height: 160rpx;
    }

    &-rg {
      height: 100%;
      width: 60%;

      display: flex;
      flex-direction: column;

      .title {
        font-size: 40rpx;
        font-weight: 800;
        color: #fff;
        letter-spacing: 10rpx;
        margin-top: 40rpx;
      }
      .content {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #ffffff;
      }
    }
  }

  &-title {
    height: $header_title;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 40rpx;
    background-color: #fff;
    border-bottom: 2rpx solid #f3f4f6;
    border-radius: 40rpx 40rpx 0 0;

    &-tip {
      font-size: 36rpx;
      font-weight: 700;
    }

    &-search {
      width: 40%;
    }
  }
}

.cate-main {
  padding-top: $header;
}
</style>
