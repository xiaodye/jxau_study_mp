<template>
  <view class="login" :style="{ paddingTop: navHeight + 'px' }">
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

    // 微信登录
    async weixinLogin() {
      try {
        // 获取微信用户信息
        const { userInfo } = await uni.getUserProfile({ desc: "获取微信用户信息", lang: "zh_CN" })
        console.log(userInfo)

        // 获取code
        const { code } = await uni.login({ provider: "weixin" })
        console.log("code：" + code)

        // 发起登录请求，获取token
        const { data: res } = await uni.request({
          url: "/wechat/login",
          method: "GET",
          data: { code: code, nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl },
        })
        // console.log(res)
        if (res.status !== "200") return uni.$u.toast("登录失败")

        // 存储token，userInfo
        uni.setStorageSync("token", res.data.token)
        this.getUserInfo(res.data.user)
      } catch (err) {
        console.error(err)
        if (err.errMsg === "getUserProfile:fail auth deny") return uni.$u.toast("取消授权")
        uni.$u.toast("请求异常，请重试")
      } finally {
      }
    },
  },

  onLoad() {},
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  box-sizing: border-box;
  background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
  padding: 0 60rpx 60rpx;

  display: flex;
  flex-direction: column;

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
    margin-top: auto;
    margin-bottom: 100rpx;

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
