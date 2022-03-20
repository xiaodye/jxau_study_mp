export const systemInfo = {
  data: () => ({
    statusBarHeight: 0,
    navigationBarHeight: 0,
    navHeight: 0,
    screenWidth: 0,
    screenHeight: 0,

    windowHeight: 0, // 可使用窗口高度
  }),

  methods: {
    // 获取设备信息
    getSystemInfo() {
      this.statusBarHeight = getApp().globalData.statusBarHeight
      this.navigationBarHeight = getApp().globalData.navigationBarHeight
      this.navHeight = getApp().globalData.navHeight
      this.screenWidth = getApp().globalData.screenWidth
      this.screenHeight = getApp().globalData.screenHeight

      this.windowHeight = uni.getSystemInfoSync().windowHeight
    },

    rpxToPx(rpx) {
      return (rpx * Number.parseInt(this.screenWidth)) / 750
    },
  },
}
