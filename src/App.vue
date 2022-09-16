<script>
import { mapMutations } from "vuex"
export default {
  globalData: {
    statusBarHeight: 0, // 状态导航栏高度
    navHeight: 0, // 总体高度
    navigationBarHeight: 0, // 导航栏高度(标题栏高度)
  },
  methods: {
    ...mapMutations("userModule", ["getUserInfo"]),

    // 获取用户信息
    async getUserInfoInit() {
      const token = uni.getStorageSync("token")
      if (!token) return uni.reLaunch({ url: "/pages/login/login" })
      const { data: res } = await uni.request({ url: "/token/get/user", method: "GET" })
      // console.log(res)
      this.getUserInfo(res.data)
    },

    // 获取小程序头部信息
    getAppHeaderInfo() {
      // 获取状态栏高度
      this.globalData.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

      // #ifdef MP-WEIXIN
      // 获取微信胶囊的位置信息 width,height,top,right,left,bottom
      const custom = wx.getMenuButtonBoundingClientRect()
      // 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
      this.globalData.navigationBarHeight = custom.height + (custom.top - this.globalData.statusBarHeight) * 2
      // 总体高度 = 状态栏高度 + 导航栏高度
      this.globalData.navHeight = this.globalData.navigationBarHeight + this.globalData.statusBarHeight
      // #endif
    },
  },
  onLaunch: function () {
    this.getUserInfoInit()
    this.getAppHeaderInfo()
  },

  onShow: function () {
    console.log("App Show")
  },
  onHide: function () {
    console.log("App Hide")
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";

@import url("@/static/fonts/iconfont-weapp-icon.css");
</style>
