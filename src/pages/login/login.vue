<template>
  <view class="login" :style="{ paddingTop: navHeight + 'px', minHeight: windowHeight + 'px' }">
    <!-- 登录提示 -->
    <view class="login-tip">Hi~，欢迎回来！</view>

    <!-- 注册跳转 -->
    <view class="rigister-go">
      <text class="rigister-go-tip">还没有账号？立即</text>
      <text class="rigister-go-url">注册</text>
    </view>

    <!-- 表单 -->
    <form-box></form-box>

    <!-- 第三方登录 -->
    <view class="login-other">
      <u-divider text="第三方登录" lineColor="#909399"></u-divider>
      <view class="login-other-weixin" @click="weixinLogin">
        <button type="primary">
          <u-icon name="weixin-circle-fill" color="#18b566" :size="rpxToPx(80)"></u-icon>
          <text>一键登录</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import formBox from "./form-box/form-box.vue"
import { systemInfo } from "@/mixin.js"
import { mapMutations, mapState } from "vuex"
export default {
  components: { formBox },
  data: () => ({}),
  mixins: [systemInfo],
  computed: {
    ...mapState("userModule", ["userInfo"]),
  },

  methods: {
    ...mapMutations("userModule", ["getUserInfo"]),
    async weixinLogin() {
      try {
        // 获取微信用户信息
        const { userInfo } = await uni.getUserProfile({ desc: "获取微信用户信息", lang: "zh_CN" })

        uni.$u.toast("授权成功")
        console.log(userInfo)
        this.getUserInfo(userInfo)
        console.log(this.userInfo)

        // 获取code
        const { code } = await uni.login({ provider: "weixin" })
        console.log("code：" + code)

        // 发起登录请求，获取openid和session_key
        // const { data: res } = await uni.request({ url: "/login/weixin", method: "POST", data: { code: code } })
        // console.log(res.data)
        // uni.setStorageSync("openid", res.data.openid)
        // uni.setStorageSync("session_key", res.data.session_key)
      } catch (err) {
        // console.log(err)
        uni.$u.toast("微信登录异常")
      }
    },
  },

  onLoad() {},
}
</script>

<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
  padding: 0 60rpx 60rpx;

  &-tip {
    font-size: 60rpx;
    font-weight: bold;
    margin-top: 60rpx;
    margin-bottom: 20rpx;
  }

  .rigister-go {
    display: flex;
    color: $uni-text-color-placeholder;
    margin-bottom: 60rpx;
    &-url {
      color: #f56c6c;
    }
  }

  &-other {
    margin-top: 100rpx;

    &-weixin {
      display: flex;
      margin-top: 80rpx;
      > button {
        height: 100rpx;
        border-radius: 50rpx;
        padding: 0 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: #d3f89f;
        background-color: transparent;
        text {
          color: #808080;
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>
