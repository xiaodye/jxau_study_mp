<template>
  <view class="result-page">
    <view>你的答案：</view>
    <view>{{ answerSheet }}</view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    answerSheet: null,
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    console.log(options.answerSheet)
    this.answerSheet = options.answerSheet
  },
}
</script>

<style lang="scss" scoped></style>
