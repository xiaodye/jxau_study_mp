<template>
  <view class="home" :style="{ paddingTop: statusBarHeight + 'px', minHeight: windowHeight + 'px' }">
    <!-- 导航栏(标题栏) -->
    <view class="nav" :style="{ height: navigationBarHeight + 'px' }">
      <u-search placeholder="前端" :showAction="false" :disabled="true"></u-search>
    </view>

    <!-- tab栏 -->
    <view class="tab" :style="{ top: navHeight + 'px' }">
      <u-tabs
        :scrollable="false"
        :list="navList"
        lineWidth="30"
        lineHeight="5"
        lineColor="#f56c6c"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: 20 + 'px',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          fontSize: 17 + 'px',
          transform: 'scale(1)',
        }"
        itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
      ></u-tabs>

      <!-- 子tab -->
      <view class="sub-tab">
        <u-tag text="推荐" type="warning" shape="circle" size="mini" bgColor="#71d5a1" color="#333" borderColor="#fff"></u-tag>
        <u-tag text="最热" type="success" shape="circle" size="mini" bgColor="#f4f4f5" color="#333" borderColor="#fff"></u-tag>
        <u-tag text="最新" type="success" shape="circle" size="mini" bgColor="#f4f4f5" color="#333" borderColor="#fff"></u-tag>
      </view>
    </view>

    <!-- 文章列表 -->
    <view class="ariticle" :style="{ paddingTop: 80 + 'px' }">
      <u-search placeholder="前端" :showAction="false"></u-search>
      <u-search placeholder="前端" :showAction="false"></u-search>
      <u-search placeholder="前端" :showAction="false"></u-search>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    statusBarHeight: 0,
    navigationBarHeight: 0,
    navHeight: 0,
    windowHeight: 0,

    navList: [
      {
        name: "文章",
        badge: {
          isDot: true,
        },
      },
      {
        name: "讨论",
      },
      {
        name: "视频",
      },
      {
        name: "资料",
      },
    ],
  }),

  methods: {
    // 得到状态导航栏高度
    getSystemInfo() {
      this.statusBarHeight = getApp().globalData.statusBarHeight;
      this.navigationBarHeight = getApp().globalData.navigationBarHeight;
      this.windowHeight = getApp().globalData.windowHeight;
      this.navHeight = getApp().globalData.navHeight;

      // console.log(this.statusBarHeight)
      // console.log(this.windowHeight)
      // console.log(this.navigationBarHeight)
    },
  },

  onLoad() {
    this.getSystemInfo();
  },
};
</script>

<style lang="scss">
$tab: 160rpx;

.home {
  background-color: $uni-bg-color-grey;
  overflow-y: auto;
  box-sizing: border-box;
}

.nav {
  // height: 102rpx;
  padding: 0 240rpx 0 40rpx;
  // padding: 10rpx 240rpx 10rpx 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab {
  background-color: #ffffff;
  height: $tab;
  // padding-bottom: 20rpx;
  position: absolute;
  width: 100%;
  .u-tabs {
    height: 100rpx;
    display: flex;
    justify-content: center;
    // align-items: center;
  }
  .sub-tab {
    padding-left: 30rpx;
    display: flex;
    .u-tag {
      margin-right: 20rpx !important;
      padding: 0 20rpx;
      // font-size: 24rpx;
    }
  }
}

.ariticle {
  margin-top: 40rpx;
}
</style>
