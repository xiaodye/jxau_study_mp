/**
 * @author lan
 * 首页
 */
<template>
  <view class="home">
    <!-- 导航栏 -->
    <view class="nav" :style="{ height: navHeight + 'px', paddingTop: statusBarHeight + 'px' }" @>
      <u-search placeholder="前端" :showAction="false" :disabled="true" @click="gotoSearch"></u-search>
    </view>

    <!-- tab栏 -->
    <view class="tab" :style="{ top: navHeight + 'px' }">
      <u-tabs
        :scrollable="false"
        :list="tabList"
        lineWidth="30"
        lineHeight="5"
        :current="tabActiveIndex"
        lineColor="#f56c6c"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: 40 + 'rpx',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          fontSize: 34 + 'rpx',
          transform: 'scale(1)',
        }"
        :itemStyle="{ paddingLeft: 30 + 'rpx', paddingRight: 30 + 'rpx', height: 68 + 'rpx' }"
        @click="switchTab"
      ></u-tabs>

      <!-- subTab -->
      <view class="sub-tab">
        <my-tag
          class="tag"
          v-for="(item, index) in subTabList"
          :key="index"
          :type="subActiveIndex === index ? 'error' : 'info'"
          size="small"
          @click="switchSubTab({ index, text: item })"
        >
          {{ item }}
        </my-tag>
      </view>
    </view>

    <!-- 首页列表 -->
    <!-- rpx转px单位 -->
    <swiper
      class="home-list"
      :style="{ height: swiperHeight + 'px', marginTop: `${rpxToPx(160) + navHeight}px` }"
      :current="tabActiveIndex"
      @change="swiperChangeHandler"
    >
      <!-- 文章 -->
      <swiper-item class="home-list-item">
        <view id="content-container-1">
          <article-list :articleList="articleList" ref="articleList"></article-list>
        </view>
      </swiper-item>

      <!-- 视频 -->
      <swiper-item class="home-list-item">
        <view id="content-container-2">
          <!-- <u-empty text="还没有视频哦" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty> -->
          <video-list :videoList="videoList"></video-list>
        </view>
      </swiper-item>

      <!-- 课程 -->
      <swiper-item class="home-list-item">
        <view id="content-container-3">
          <u-empty text="还没有课程哦" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
        </view>
      </swiper-item>

      <!-- 电子书 -->
      <swiper-item class="home-list-item">
        <view id="content-container-4">
          <u-empty text="还没有电子书哦" icon="http://cdn.uviewui.com/uview/empty/car.png"></u-empty>
        </view>
      </swiper-item>
    </swiper>

    <!-- 开发 -->
    <!-- <navigator open-type="navigate" url="/pages/login/login">
      <u-button type="error" text="登录页开发"></u-button>
    </navigator> -->

    <!-- seed -->
    <!-- <navigator style="margin-top: 20rpx" open-type="navigate" url="/subPackages/seedPages/uploadPic/uploadPic">
      <u-button type="error" text="seed"></u-button>
    </navigator> -->

    <view class="go-write" v-if="showWrite" @click="gotoWrite">
      <u-icon name="attach" :size="rpxToPx(60)" color="#19be6b"></u-icon>
    </view>
  </view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { articleList } from "@/mock/articleList.js"
import { videoList } from "@/mock/videoList.js"
export default {
  components: {},
  mixins: [systemInfo],

  data: () => ({
    tabList: [
      {
        name: "文章",
      },
      {
        name: "视频",
      },
      {
        name: "课程",
      },
      {
        name: "电子书",
      },
    ],

    subTabList: ["推荐", "最热", "最新"],
    tabActiveIndex: 0,
    subActiveIndex: 0,
    swiperHeight: 0,

    showWrite: true,
    articleList: articleList,
    videoList: videoList,
    contentList: [articleList, [], [], []],

    // 当前ref
    activeRef: "articleList",

    totalPages: 4, // 总页数
    paramsData: {
      pageNum: 1, // 当前页数
      pageSize: 5, // 每页最大数据量
    },
  }),

  methods: {
    // 切换tab
    switchTab({ name, index }) {
      this.tabActiveIndex = index
      this.setSwiperHeight()
    },

    // 切换子tab
    switchSubTab(item) {
      // console.log(item);
      this.subActiveIndex = item.index
    },

    // 滑块滚动
    swiperChangeHandler({ detail }) {
      this.tabActiveIndex = detail.current
      this.setSwiperHeight()
    },

    // 动态舌设置swiper高度，因为swiper只能设置固定高度，swiper-item宽高100%是相对于其父组件
    setSwiperHeight() {
      const contentNodesRef = uni
        .createSelectorQuery()
        .in(this)
        .select(`#content-container-${this.tabActiveIndex + 1}`)

      contentNodesRef
        .boundingClientRect(res => {
          // 保证最小高度，防止选项卡高度太低，导致无法滚动
          if (res.height < this.minSwiperHeight) return (this.swiperHeight = this.minSwiperHeight)
          this.swiperHeight = res.height

          console.log(this.swiperHeight)
        })
        .exec()
    },

    // 检验请求
    async getUserInfo() {
      try {
        const { data: res } = await uni.request({ url: "/user/get" })
        if (res.status !== 0) return console.log("获取用户信息失败")
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    },

    // 加载更多
    loadMore() {
      // 节流
      if (this.$refs.articleList.status === "loading" || this.$refs.articleList.status === "nomore") return

      this.$refs.articleList.status = "loading"
      setTimeout(() => {
        this.articleList = [...this.articleList, ...articleList]
        this.paramsData.pageNum++
        console.log(this.articleList)

        // 重新获取内容高度
        this.$nextTick(() => this.setSwiperHeight())

        // 到底了
        if (this.paramsData.pageNum >= this.totalPages) return (this.$refs.articleList.status = "nomore")

        this.$refs.articleList.status = "loadmore"
      }, 3000)
    },

    // 跳转写文章page
    gotoWrite() {
      uni.navigateTo({ url: "/subPackages/index/write/write" })
    },

    // 跳转搜索page
    gotoSearch() {
      uni.navigateTo({ url: "/subPackages/index/historySearch/historySearch" })
    },
  },
  computed: {
    minSwiperHeight() {
      return this.windowHeight - (this.rpxToPx(160) + this.navHeight)
    },
  },
  watch: {
    // 是否展示gotoWrite
    tabActiveIndex(val) {
      this.showWrite = val === 0 ? true : false
    },
  },

  onLoad() {
    // 加载获取内容高度
    this.$nextTick(() => this.setSwiperHeight())
  },

  // 监听触底
  onReachBottom() {
    this.loadMore()
  },
}
</script>

<style lang="scss" scoped >
$tab: 160rpx;

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $uni-bg-color-grey;
  box-sizing: border-box;
}

.nav {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  z-index: 99;
  background-color: #fff;
  padding-left: 40rpx;
  padding-right: 240rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab {
  background-color: #ffffff;
  height: $tab;
  // padding-bottom: 20rpx;
  position: fixed;
  z-index: 99;

  width: 100%;
  .sub-tab {
    padding-left: 30rpx;
    margin-top: 20rpx;
    display: flex;
    .tag {
      margin-right: 20rpx;
    }
  }
}

.home-list {
  overflow: auto;
}

.go-write {
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dbf1e1;
  border-radius: 50%;
  right: 10%;
  bottom: 10%;
}
</style>
