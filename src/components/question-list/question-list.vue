<template>
  <view class="question-container">
    <!-- 题目列表 -->
    <view class="question-list" v-if="questionList.length">
      <view class="question-list-item" v-for="item in questionList" :key="item.id" @click.stop="gotoDetail(item.id)">
        <view class="question-list-item-desc">
          <view class="title u-line-1">{{ item.title }}</view>

          <view class="info">
            <view class="level">
              <my-tag class="tag" :type="levelColor(item.level)" :circle="false" size="mini">{{ item.level }}</my-tag>
              <my-tag class="tag" type="info" size="mini" v-for="tag in item.tagList" :key="tag.tagId">{{ tag.tag }}</my-tag>
            </view>

            <view class="pass">
              <text class="pass-text">正确率：</text>
              <text class="pass-rate">{{ item.passRate + "%" }}</text>
            </view>
          </view>
        </view>

        <!-- 箭头 -->
        <u-icon name="arrow-right" size="24" color="#999"></u-icon>
      </view>
    </view>

    <!-- 空白页 -->
    <view v-else class="empty">
      <u-empty class="empty" icon="http://cdn.uviewui.com/uview/empty/data.png" text="这里什么也没有"></u-empty>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    questionList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {
    // 根据难度选择tag种类
    levelColor(level) {
      switch (level) {
        case "简单":
          return "success"
          break
        case "中等":
          return "warning"
          break
        case "困难":
          return "error"
        default:
          break
      }
    },

    // goto detail
    gotoDetail(id) {
      uni.navigateTo({ url: "/subPackages/exercise/questionDetail/questionDetail?id=" + id })
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    // this.refreshInit()
  },
}
</script>

<style lang="scss" scoped>
.question-container {
  display: flex;
  flex-direction: column;
}
.question-list {
  width: 100%;
  // padding: 20rpx;// 内边距会让自定义下拉刷新失效
  box-sizing: border-box;
  &-item {
    // height: 200rpx;
    box-sizing: border-box;
    margin: 0 20rpx;
    margin-bottom: 20rpx;
    padding: 20rpx 30rpx;
    background-color: #fff;
    border-radius: 12rpx;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:first-child {
      margin-top: 20rpx;
    }
    &:last-of-type {
      margin-bottom: 20rpx;
    }

    &-desc {
      flex: 1;

      display: flex;
      flex-direction: column;
      margin-right: 40rpx;
      .title {
        font-weight: 600;
        font-size: 36rpx;
        margin-bottom: 20rpx;
      }

      .info {
        display: flex;
        font-size: 24rpx;
        align-items: center;
        color: $uni-text-color-placeholder;

        box-sizing: border-box;
        width: 100%;

        .level {
          .tag {
            margin-right: 20rpx;
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .pass {
          margin-left: auto;
          &-rate {
            color: $uni-color-success;
          }
        }
      }
    }
  }
}

.empty {
  height: 500rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
