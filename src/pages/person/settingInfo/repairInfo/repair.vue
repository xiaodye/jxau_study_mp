<template>
  <view class="repairInfo">
    <u-navbar :title="setTitle" @rightClick="rightClick" :autoBack="true"></u-navbar>
    <!-- 放置原有信息和供用户修改的输入框: -->
    <view class="oldValueInput">
      <text class="fontText">{{ userInfo.title }}</text>
      <u--input
        :value="userInfo.value"
        :prefixIcon="userInfo.iconUrl"
        prefixIconStyle="font-size: 22px;color: #909399"
        disabled
      ></u--input>
      <text class="fontText">请输入正确信息</text>
      <u--input :value="value" v-model="value" prefixIcon="edit-pen" prefixIconStyle="font-size: 22px;color: #909399"></u--input>
      <u-button type="primary" @click="mySubmit">提交修改</u-button>
    </view>
  </view>
</template>

<script>
import { goDetail } from "@/utils/utils.js"
export default {
  data() {
    return {
      value: "",
      timer: null,
      userInfo: {},
    }
  },
  onLoad(option) {
    this.userInfo = JSON.parse(option.Obj)
  },
  computed: {
    setTitle() {
      return "修改" + this.userInfo.title
    },
  },
  methods: {
    mySubmit() {
      if (this.value === "") {
        uni.showModal({
          tittle: "提示",
          content: "输入不可为空!",
        })
      } else {
        let that = this
        uni.showModal({
          tittle: "提示",
          content: "确定提交吗?",
          success: res => {
            that.userInfo.value = that.value
            let result = new Promise((resolve, reject) => {
              uni.showModal({
                title: "提示",
                content: "修改成功!",
                success: res => {
                  resolve(res)
                },
                fail: err => {
                  reject(err)
                },
              })
            })
            result
              .then(res => {
                // console.log('this.userInfo',this.userInfo)
                goDetail("", 2, {})
              })
              .catch(err => {
                console.log("出错:", err)
              })
          },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.repairInfo {
  display: flex;
  // align-items: center;
  flex-direction: column;

  &-title {
    text-align: center;
    font-size: 40rpx;
  }

  .oldValueInput {
    display: flex;
    margin-top: 150rpx;
    flex-direction: column;
    align-content: center;

    .fontText {
      font-size: 35rpx;
      margin: 15rpx;
      color: #525288;
    }

    ::v-deep .u-input {
      margin: 10rpx 20rpx 10rpx 20rpx;
    }

    ::v-deep .u-button {
      margin: 20rpx;
      width: 95%;
    }
  }
}
</style>
