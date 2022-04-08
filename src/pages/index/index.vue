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
      :current="swiperActiveIndex"
      @change="swiperChangeHandler"
    >
      <!-- 文章 -->
      <swiper-item class="home-list-item">
        <view id="content-container-1">
          <article-list :articleList="articleList"></article-list>
        </view>
      </swiper-item>

      <!-- 视频 -->
      <swiper-item class="home-list-item">
        <view id="content-container-2">
          <u-empty text="还没有视频哦" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
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
    <navigator open-type="navigate" url="/pages/login/login">
      <u-button type="error" text="登录页开发"></u-button>
    </navigator>

    <!-- seed -->
    <!-- <navigator style="margin-top: 20rpx" open-type="navigate" url="/subPackages/seedPages/uploadPic/uploadPic">
      <u-button type="error" text="seed"></u-button>
    </navigator> -->

    <view class="go-write" @click="gotoWrite">
      <u-icon name="attach" :size="rpxToPx(60)" color="#19be6b"></u-icon>
    </view>
  </view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { articleList } from "@/mock/articleList.js"
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
    swiperActiveIndex: 0,
    swiperHeight: 0,
    articleList: articleList,
    contentList: [articleList, [], [], []],
  }),

  methods: {
    // 切换tab
    switchTab({ name, index }) {
      this.swiperActiveIndex = index
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
      contentNodesRef.boundingClientRect((res) => (this.swiperHeight = res.height)).exec()
      // console.log(this.swiperHeight)
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

    // 跳转写文章page
    gotoWrite() {
      uni.navigateTo({ url: "/subPackages/index/write/write" })
    },

    // 跳转搜索page
    gotoSearch() {
      uni.navigateTo({ url: "/subPackages/index/historySearch/historySearch" })
    },
  },

  onLoad() {
    // swiperHeight
    this.$nextTick(() => this.setSwiperHeight())
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
  min-height: 80vh;
  padding: 20rpx;
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
