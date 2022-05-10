<template>
  <view class="errorBookDetail">
    <questionInfo :analysisData="question" @addWrongBook="addWrongBook"></questionInfo>

    <!-- 解析 -->
    <view class="explain">
      <view class="title">解析</view>
      <view class="content">
        {{ question.hasAnalysis ? question.analysis_content : "暂无解析" }}
      </view>
    </view>

    <u-notify ref="uNotify" message="Hi uView"></u-notify>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    question: {},
  }),
  computed: {},
  methods: {
    // 添加至错题本
    addWrongBook(questionId, value) {
      console.log(value)
      if (!value) {
        this.question.withinWrongBook = false
        this.$refs.uNotify.error("已取消添加")
      } else {
        this.question.withinWrongBook = true
        this.$refs.uNotify.success("已添加到错题本")
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.question = JSON.parse(options.question)
  },
}
</script>

<style lang="scss" scoped>
@mixin before() {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  height: 80%;
  width: 8rpx;
  border-radius: 4rpx;
  background-color: #2b85e4;
}

.errorBookDetail {
  box-sizing: border-box;
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
  padding: 20rpx;

  .explain {
    background-color: #fff;
    border-radius: 20rpx;
    min-height: 150rpx;
    margin-top: 40rpx;
    padding: 20rpx;
    transition: all 0.2s;

    display: flex;
    flex-direction: column;

    .title {
      position: relative;
      font-size: 32rpx;
      color: $uni-color-subtitle;
      font-weight: 700;
      padding-left: 30rpx;

      &::before {
        @include before();
      }
    }

    .content {
      margin-top: 20rpx;
      font-size: 30rpx;
      color: $uni-text-color-disable;
    }
  }
}
</style>