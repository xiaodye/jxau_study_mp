<template>
  <view class="wrongQuestionList">
    <view class="wq-list" v-if="wrongQuestionList.length">
      <view class="wq-list-item" v-for="item in wrongQuestionList" :key="item.id" @click="gotoQuestionDetail(item)">
        <view class="wq-list-item-main">
          <view class="content u-line-1">{{ item.content }}</view>
          <my-tag size="mini" :type="tagBgColor(item.question_type)" :circle="false">{{ item.question_type }}</my-tag>
        </view>
        <u-icon name="arrow-right" :size="rpxToPx(50)" color="#999"></u-icon>
      </view>
    </view>

    <!-- 空白页 -->
    <u-empty v-else class="empty" icon="http://cdn.uviewui.com/uview/empty/data.png" text="你还没有错题"></u-empty>
  </view>
</template>

<script>
export default {
  props: {
    wrongQuestionList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    tagBgColor() {
      return type => (type === "单选题" ? "success" : "error")
    },
  },
  methods: {
    gotoQuestionDetail(question) {
      uni.navigateTo({ url: "/subPackages/person/errorBookDetail/errorBookDetail?question=" + JSON.stringify(question) })
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.wrongQuestionList {
  // padding: 20rpx;

  .wq-list {
    padding: 20rpx;

    &-item {
      background-color: #fff;
      height: 150rpx;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      padding: 20rpx;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &-main {
        flex: 1;
        height: 100%;
        margin-right: 20rpx;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .content {
          font-size: 32rpx;
          font-weight: bold;
          color: $uni-color-paragraph;
        }
      }
    }
  }
}
</style>