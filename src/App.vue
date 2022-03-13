<script>
export default {
  globalData: {
    statusBarHeight: 0, // 状态导航栏高度
    windowHeight: 0, // 可使用窗口高度
    navHeight: 0,
    navigationBarHeight: 0, // 导航栏高度(标题栏高度)
  },
  onLaunch: function () {
    console.log("App Launch");

    // 状态栏高度
    this.globalData.statusBarHeight = uni.getSystemInfoSync()["statusBarHeight"];
    // 可使用窗口高度
    this.globalData.windowHeight = uni.getSystemInfoSync()["windowHeight"];

    // #ifdef MP-WEIXIN
    // 获取微信胶囊的位置信息 width,height,top,right,left,buttom
    const custom = wx.getMenuButtonBoundingClientRect();
    // console.log(custom)

    // 总体高度 = 状态栏高度 + 胶囊高度 + （胶囊距离顶部的距离 - 状态栏高度）* 2
    const navHeight = this.globalData.statusBarHeight + custom.height + (custom.top - this.globalData.statusBarHeight) * 2;
    this.globalData.navHeight = navHeight;

    // 导航栏高度(标题栏高度) = 总体高度 - 状态栏高度
    this.globalData.navigationBarHeight = navHeight - this.globalData.statusBarHeight;
    // console.log("导航栏高度："+this.globalData.navigationBarHeight)
    // #endif

    console.log(this.globalData);
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
