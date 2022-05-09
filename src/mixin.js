export const systemInfo = {
  data: () => ({
    statusBarHeight: 0,
    navigationBarHeight: 0,
    navHeight: 0,

    startTime: 0,
    setTime: null,
    todayLearningTime: 0,
    oneWeekLearningTime: 0,
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

  computed: {
    // 获取可使用窗口高度
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight
    },
    myLearnTime() {
      clearInterval(this.setTime)
      this.setTime = setInterval(() => {
        this.startTime++
        // console.log('持续时间:', this.startTime)
        if (this.startTime % 60 === 0 && this.startTime !== 0) {
          this.todayLearningTime += 1
          console.log(this.todayLearningTime)
        }
        if (this.todayLearningTime % 60 !== 0 && this.todayLearningTime !== 0) {
          // console.log('xiaoshi1:',this.todayLearningTime%60)
          this.oneWeekLearningTime = Math.floor(this.todayLearningTime / 60)
        }
      }, 1000)
      // console.log('学习时长:', this.todayLearningTime, this.oneWeekLearningTime)
    },
  },

  onLoad() {
    // 在登录的时候就查询缓存内容，若存在学习时间则取出再进行计算；
    if (uni.getStorageSync("todayLearningTime") !== -1 && uni.getStorageSync("oneWeekLearningTime") !== -1) {
      this.todayLearningTime = uni.getStorageSync("todayLearningTime")
      this.oneWeekLearningTime = uni.getStorageSync("oneWeekLearningTime")
    }
    this.getSystemInfo()
  },

  mounted() {
    this.getSystemInfo()
  },

  onHide() {
    console.log("隐藏")
    try {
      // 在页面隐藏时将学习时长放入缓存，说明用户结束了本次登录
      uni.setStorageSync("todayLearningTime", this.todayLearningTime)
      uni.setStorageSync("oneWeekLearningTime", this.oneWeekLearningTime)
      clearInterval(this.setTime)
    } catch (e) {
      //TODO handle the exception
    }
  },
}

export const globalMixin = {
  // rpx转px
  methods: {
    rpxToPx(rpx) {
      const screenWidth = uni.getSystemInfoSync().screenWidth
      return (Number.parseInt(rpx) * screenWidth) / 750
    },
  },
}
