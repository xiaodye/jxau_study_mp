<template>
  <form class="form-container" @submit="formSubmit">
    <!-- 输入框1 -->
    <view class="form-container-item">
      <u-icon :size="rpxToPx(50)" :name="formType[0].icon"></u-icon>
      <input
        :password="formType[0].isPassword"
        :name="formType[0].name"
        v-model="firstColumn"
        :type="formType[0].type"
        :placeholder="formType[0].placeholder"
      />
    </view>

    <!-- 输入框2 -->
    <view class="form-container-item">
      <u-icon :size="rpxToPx(50)" :name="formType[1].icon"></u-icon>
      <input
        :password="formType[1].isPassword"
        :name="formType[1].name"
        v-model="secondColumn"
        :type="formType[1].type"
        :maxlength="formType[1].maxLength ? formType[1].maxLength : 12"
        :placeholder="formType[1].placeholder"
      />
      <u-code :seconds="seconds" change-text="Xs" ref="uCode" @end="codeEnd" @change="codeChange"></u-code>
      <view class="send" v-if="formType[1].name === 'code'" :class="[sending ? 'disabled' : '']" @click.stop="getCode">
        {{ tips }}
      </view>
    </view>

    <!-- 按钮组 -->
    <view class="form-btns">
      <button class="form-btns-item" form-type="submit" :disabled="loginBtn.disabled" type="primary">
        <u-loading-icon v-if="loginBtn.loading" mode="circle" :size="rpxToPx(36)"></u-loading-icon>
        <view class="form-btns-item-text">{{ loginBtn.btnText }}</view>
      </button>
    </view>

    <!-- 验证码登录 -->
    <view class="form-code" @click="switchWay">{{ loginText }}</view>

    <!-- 反馈组件 -->
    <u-toast ref="uToast"></u-toast>
  </form>
</template>

<script>
export default {
  props: {},
  data: () => ({
    firstColumn: "",
    secondColumn: "",
    formType: [
      {
        name: "userName",
        placeholder: "用户名",
        type: "text",
        icon: "tags",
        isPassword: false,
      },
      {
        name: "password",
        placeholder: "密码",
        type: "text",
        icon: "lock",
        isPassword: true,
      },
    ],
    isPhoneLogin: false,
    loginText: "使用验证码登录",
    loginBtn: {
      btnText: "立即登录",
      loading: false,
      disabled: false,
    },

    tips: "",
    sending: false,
    seconds: 10,
  }),
  computed: {},
  methods: {
    // 提交表单
    formSubmit(e) {
      const { value: userInfo } = e.detail

      if (!this.isPhoneLogin) {
        if (userInfo.userName && userInfo.password) {
          console.log(userInfo)
          // this.accountLogin(userInfo)

          this.loginBtn = { btnText: "登录中", disabled: true, loading: true }
          setTimeout(() => {
            this.loginBtn = { btnText: "立即登录", loading: false, disabled: false }
            this.$refs.uToast.show({ type: "success", message: "登录成功" })
          }, 3000)
        } else {
          this.$refs.uToast.show({ type: "error", message: "用户名或密码不能为空" })
        }
      } else {
        if (userInfo.phone && userInfo.code) {
          console.log(userInfo)
          // this.phoneLogin(userInfo)

          this.loginBtn = { btnText: "登录中", disabled: true, loading: true }
          setTimeout(() => {
            this.loginBtn = { btnText: "立即登录", loading: false, disabled: false }
            this.$refs.uToast.show({ type: "success", message: "登录成功" })
          }, 3000)
        } else {
          this.$refs.uToast.show({ type: "error", message: "电话号码或验证码不能为空" })
        }
      }
    },

    // 切换登录方式
    switchWay() {
      this.loginText === "使用验证码登录" ? (this.loginText = "使用账号密码登录") : (this.loginText = "使用验证码登录")
      this.isPhoneLogin = !this.isPhoneLogin
    },

    // 账号密码登录
    async accountLogin(accountInfo) {
      const { data: res } = await uni.request({
        url: "/api/login/byaccount",
        method: "POST",
        data: { username: accountInfo.userName, password: accountInfo.password },
      })
      if (res.status !== 200) return this.$refs.uToast.show({ type: "error", message: "登录失败" })
      console.log(res)
    },

    // 电话号码登录
    async phoneLogin(phoneInfo) {
      const { data: res } = await uni.request({
        url: "/api/login/byphone",
        method: "POST",
        data: { phone: phoneInfo.phone, code: phoneInfo.code },
      })

      if (res.status !== 200) return this.$refs.uToast.show({ type: "error", message: "登录失败" })
      console.log(res)
    },

    // 监听code改变
    codeChange(text) {
      this.tips = text
    },

    // 获取验证码
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 通知验证码组件内部开始倒计时
        this.$refs.uCode.start()
        this.sending = true
        setTimeout(() => {
          uni.$u.toast("验证码已发送")
        }, 2500)
      }
    },

    // 倒计时结束
    codeEnd() {
      this.sending = false
    },
  },
  watch: {
    // 监听表单切换
    isPhoneLogin: {
      immediate: true,
      handler(val) {
        // 重置表单
        this.firstColumn = ""
        this.secondColumn = ""

        // 切换表单
        if (!val) {
          this.formType = [
            {
              name: "userName",
              placeholder: "用户名",
              type: "text",
              icon: "tags",
              isPassword: false,
            },
            {
              name: "password",
              placeholder: "密码",
              type: "text",
              icon: "lock",
              isPassword: true,
            },
          ]
        } else {
          this.formType = [
            {
              name: "phone",
              placeholder: "电话号码",
              type: "number",
              icon: "share",
              isPassword: false,
            },
            {
              name: "code",
              placeholder: "验证码",
              type: "number",
              icon: "bell",
              isPassword: false,
              maxLength: 6,
            },
          ]
        }
      },
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    // console.log("mounted")
  },
}
</script>

<style lang="scss" scoped>
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
    .send {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #18b566;
      // color: #333;
      &.disabled {
        color: #999;
      }
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
      background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
      margin-bottom: 20rpx;

      display: flex;
      justify-content: center;
      align-items: center;

      &-text {
        margin-left: 20rpx;
      }
    }
  }

  .form-code {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50rpx;
    font-size: 34rpx;
    color: $uni-text-color-placeholder;
  }
}
</style>
