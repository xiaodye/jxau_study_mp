<template>
  <view class="errorBook">
    <wrongQuestion-list :wrongQuestionList="wrongQuestionList"></wrongQuestion-list>
  </view>
</template>

<script>
import { wrongQuestionList } from "@/mock/wrongQuestionList"
export default {
  data: () => ({
    wrongQuestionList: [],
  }),
  computed: {},
  methods: {
    async getWrongQuestionList() {
      uni.showLoading()
      const { data: res } = await uni.request({ url: "/question/get/user/mistakes", method: "GET" })
      if (res.status !== "200") return uni.$toast("获取错题列表失败")
      this.wrongQuestionList = res.data
      uni.hideLoading()
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getWrongQuestionList()
  },
}
</script>

<style lang="scss" scoped>
.errorBook {
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
}
</style>