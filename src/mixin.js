export const systemInfo = {
  data: () => ({
    statusBarHeight: 0,
    navigationBarHeight: 0,
    navHeight: 0,
    windowHeight: 0,
  }),

  methods: {
    // 获取设备信息
    getSystemInfo() {
      this.statusBarHeight = getApp().globalData.statusBarHeight
      this.navigationBarHeight = getApp().globalData.navigationBarHeight
      this.windowHeight = getApp().globalData.windowHeight
      this.navHeight = getApp().globalData.navHeight
    },
  },
}
