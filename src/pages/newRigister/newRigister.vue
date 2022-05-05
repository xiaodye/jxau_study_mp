<template>
  <div class="rigister" :style="{ paddingTop: navHeight + 'px' }">
    <!-- 登录提示 -->
    <view class="rigister-tip">注册账号</view>

    <!-- 注册跳转 -->
    <view class="rigister-go">
      <text class="rigister-go-tip">已有账号？立即</text>
      <text class="rigister-go-url" @click="gotoLogin">登录</text>
    </view>

    <!-- 表单 -->
    <form class="form-container" @submit="rigisterAccount">
      <view class="form-container-item">
        <u-icon :size="rpxToPx(50)" color="#303133" name="tags"></u-icon>
        <input name="userName" type="text" placeholder="请输入用户名" />
      </view>

      <view class="form-container-item">
        <u-icon :size="rpxToPx(50)" color="#303133" name="lock"></u-icon>
        <input name="password" :maxlength="12" password placeholder="密码" />
      </view>

      <view class="form-container-item">
        <u-icon :size="rpxToPx(50)" color="#303133" name="lock-fill"></u-icon>
        <input name="confirmPassword" :maxlength="12" password placeholder="确认密码" />
      </view>

      <!-- 按钮组 -->
      <view class="form-btns">
        <button class="form-btns-item" form-type="submit" :disabled="loginBtn.disabled" type="primary">
          <u-loading-icon v-if="loginBtn.loading" mode="circle" :size="rpxToPx(36)"></u-loading-icon>
          <view class="form-btns-item-text">{{ loginBtn.btnText }}</view>
        </button>
      </view>
    </form>

    <!-- 反馈组件 -->
    <u-toast ref="uToast"></u-toast>
  </div>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { mapMutations } from "vuex"
export default {
  components: {},
  mixins: [systemInfo],
  data: () => ({
    loginBtn: { btnText: "立即注册", loading: false, disabled: false },
  }),

  computed: {},
  methods: {
    ...mapMutations("userModule", ["getUserInfo"]),

    async rigisterAccount(e) {
      let { userName, password, confirmPassword } = e.detail.value
      userName = userName.trim()
      /**
       * 用户名：4-16位字母,数字,汉字,下划线 汉字表示4个字符
       * 密码：最短6位，最长12位 {6,16}，[a-z]  [A-Z] [0-9] [-_]
       */
      const userNameReg = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/
      const passwordReg = /^[\w_-]{6,12}$/

      if (!userName || !password || !confirmPassword) {
        this.$refs.uToast.show({ type: "error", message: "用户名或密码不能为空" })
        return
      }

      if (!userNameReg.test(userName)) {
        this.$refs.uToast.show({ type: "error", message: "用户名不符合规范" })
        return
      }
      if (password !== confirmPassword) {
        this.$refs.uToast.show({ type: "error", message: "两次密码不一致" })
        return
      } else if (!passwordReg.test(password)) {
        this.$refs.uToast.show({ type: "error", message: "密码不符合规范" })
      }

      this.loginBtn = { btnText: "注册中", disabled: true, loading: true }

      try {
        const { data: res } = await uni.request({ url: "/test", method: "GET", data: { userName: userName, password: password } })
        console.log(res)
        if (res.message === "用户名已存在") return this.$refs.uToast.show({ type: "error", message: "用户名已存在" })

        uni.setStorageSync("token", res.data.token)
        this.getUserInfo(res.data.user)
        uni.reLaunch({ url: "/pages/index/index" })
      } catch (err) {
        console.error(err)
        uni.$u.toast("服务器异常")
      } finally {
        this.loginBtn = { btnText: "立即注册", loading: false, disabled: false }
      }
    },

    gotoLogin() {
      uni.redirectTo({ url: "/pages/login/login" })
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
}
</script>

<style lang="scss" scoped>
.rigister {
  min-height: 100vh;
  box-sizing: border-box;
  background-image: linear-gradient(-225deg, #dfffcd 0%, #90f9c4 48%, #39f3bb 100%);
  background-size: cover;
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

  .form-container {
    &-item {
      width: 80%;
      height: 70rpx;
      border-bottom: 2rpx solid #ceccca;
      margin-bottom: 30rpx;

      display: flex;
      align-items: center;

      input {
        margin-left: 15rpx;
      }
    }

    .form-btns {
      overflow: hidden;
      margin-top: 100rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &-item {
        height: 80rpx;
        width: 100%;
        border-radius: 40rpx;
        font-size: 36rpx;
        background-image: linear-gradient(to right, #38f9d7 0%, #43e97b 100%);
        margin-bottom: 20rpx;

        display: flex;
        justify-content: center;
        align-items: center;

        &-text {
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>