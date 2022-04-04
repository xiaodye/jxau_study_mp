export const systemInfo = {
  data: () => ({
    statusBarHeight: 0,
    navigationBarHeight: 0,
    navHeight: 0,
  }),

  methods: {
    // 获取设备信息
    getSystemInfo() {
      this.statusBarHeight = getApp().globalData.statusBarHeight

      // #ifdef MP-WEIXIN
      this.navigationBarHeight = getApp().globalData.navigationBarHeight
      this.navHeight = getApp().globalData.navHeight
      // #endif
    },
  },

  onLoad() {
    this.getSystemInfo()
  },

  mounted() {
    this.getSystemInfo()
  },
}

export const globalMixin = {
  // rpx转px
  methods: {
    rpxToPx(rpx) {
      const screenWidth = uni.getSystemInfoSync().screenWidth
      return (rpx * Number.parseInt(screenWidth)) / 750
    },
  },
  computed: {
    // 获取可使用窗口高度
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight
    },
  },
}
