<template>
  <view class="question-info">
    <view class="title">题目</view>

    <!-- 题目类型 -->
    <my-tag class="type" :type="analysisData.question_type === '单选题' ? 'success' : 'error'" size="mini" :circle="false">
      {{ analysisData.question_type }}
    </my-tag>

    <!-- 题目 -->
    <view class="desc">{{ analysisData.content }}</view>

    <!-- 选项卡 -->
    <view class="option-group">
      <view
        class="option-group-item"
        v-for="item in analysisData.choices"
        :key="item.key"
        :class="[getOptionBgColor(analysisData.question_type, analysisData.right_choice, item.key) ? 'active' : '']"
      >
        <view class="key">{{ item.key + "." }}</view>
        <view class="option-group-item-text">{{ item.choice }}</view>
      </view>
    </view>

    <!-- 用户答案 -->
    <view class="option-user">
      <view class="option-user-tip">你的答案：</view>
      <view class="option-user-list" :style="{ color: getAnswerColor(analysisData.isCorrect) }">
        {{ analysisData.user_choice }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    analysisData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    getOptionBgColor() {
      return (question_type, right_choice, optionKey) => {
        if (question_type === "单选题") return optionKey === right_choice
        return right_choice.includes(optionKey)
      }
    },

    getAnswerColor() {
      return isCorrect => (isCorrect ? "#19be6b" : "#f56c6c")
    },
  },
  methods: {},
  watch: {},

  mounted() {},
}
</script>

<style lang="scss" scoped>
.question-info {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;

  .title {
    margin-bottom: 40rpx;
    position: relative;
    font-size: 32rpx;
    color: $uni-color-subtitle;
    font-weight: 700;
    padding-left: 30rpx;

    &::before {
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
  }

  .desc {
    margin-top: 20rpx;
    font-size: 35rpx;
    color: $uni-color-paragraph;
  }

  .option-group {
    display: flex;
    flex-direction: column;
    margin-top: 40rpx;

    &-item {
      display: flex;

      box-sizing: border-box;
      width: 100%;
      background-color: #f3f4f6;
      border-radius: 20rpx;
      padding: 20rpx;
      margin-bottom: 30rpx;
      color: $uni-text-color-grey;

      &:last-of-type {
        margin: 0;
      }

      &.active {
        background-image: linear-gradient(to right, #19be6b 0%, #71d5a1 100%);
        color: #fff;
      }

      .key {
        width: 50rpx;
      }

      &-text {
        flex: 1;
        font-size: 32rpx;
      }
    }
  }

  .option-user {
    display: flex;
    align-items: center;
    height: 60rpx;
    margin-top: 40rpx;

    &-tip {
      font-size: 32rpx;
      color: $uni-color-paragraph;
    }
    &-list {
      font-size: 32rpx;
      font-weight: bold;
    }
  }
}
</style>
