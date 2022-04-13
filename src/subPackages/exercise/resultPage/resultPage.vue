<template>
  <view class="result">
    <!-- 总览 -->
    <view class="result-panel">
      <!-- 题目 -->
      <view class="question-list-item">
        <view class="question-list-item-desc">
          <view class="title u-line-1">{{ question.title }}</view>
          <!-- 难度 -->
          <view class="info">
            <view class="level">
              <my-tag class="tag" :type="levelColor(question.level)" :circle="false" size="mini">{{ question.level }}</my-tag>
              <my-tag class="tag" type="info" size="mini" v-for="tag in question.tagList" :key="tag.tagId">{{ tag.tag }}</my-tag>
            </view>

            <!-- 通过率 -->
            <view class="pass">
              <text class="pass-text">通过率：</text>
              <text class="pass-rate">{{ question.passRate + "%" }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- chart -->
      <view class="result-panel-chart">
        <view class="result-panel-chart-circle">
          <view class="sub-circle">
            <text class="rate">{{ 60 + ".00%" }}</text>
            <text class="text">正确率</text>
          </view>
        </view>
      </view>
    </view>

    <!-- case -->
    <view class="result-case">
      <view class="result-case-tip">作答情况</view>
      <view class="result-case-list">
        <view class="result-case-list-item" v-for="(item, index) in caseList" :key="index">
          <text class="num">{{ item.num }}</text>
          <text class="text">{{ item.text }}</text>
        </view>
      </view>
    </view>

    <!-- answers-list -->
    <view class="result-answer-container">
      <view class="tip">正确答案</view>
      <view class="answer-list">
        <view class="answer-list-item" v-for="(item, index) in answerList" :key="index">
          <text class="answer-list-item-index">{{ index + 1 + "." }}</text>
          <text class="answer-list-item-option">{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 查看解析 -->
    <u-button text="查看解析" shape="circle" color="#19be6b"></u-button>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    answerSheet: null,
    question: {
      id: "02",
      title: "寻找两个正序数组的中位数寻找两个正序数组的中位数",
      level: "困难",
      tagList: [
        {
          tagId: "0001",
          tag: "二分",
        },
        {
          tagId: "0002",
          tag: "归并排序",
        },
      ],
      passRate: 11,
    },
    caseList: [
      { text: "共计", num: 10 },
      { text: "答对", num: 6 },
      { text: "答错", num: 4 },
    ],

    answerList: ["A", "D", "C", "B", "C", "B", "B", ["A", "B"], ["B", "D"], ["A", "B", "C", "D"]],
  }),
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
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    console.log(options.answerSheet)
    this.answerSheet = options.answerSheet
  },
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
$chart_panel: 600rpx;
$case_panel: 220rpx;
$answer_panel: 340rpx;

.result {
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
  padding: 20rpx;

  display: flex;
  flex-direction: column;

  &-panel {
    background-color: #fff;
    min-height: $chart_panel;
    border-radius: 20rpx;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    // padding: 20rpx;

    &-chart {
      flex: 1;
      display: flex;

      &-circle {
        display: flex;

        margin: auto;
        width: 350rpx;
        height: 350rpx;
        border-radius: 50%;
        background-image: linear-gradient(120deg, #2af598 0%, #009efd 100%);
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        .sub-circle {
          margin: auto;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background-color: #fff;

          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          padding: 60rpx 0;

          .rate {
            font-size: 45rpx;
            font-weight: 600;
            color: $uni-color-success;
          }
          .text {
            font-size: 30rpx;
            font-weight: 600;
          }
        }
      }
    }
  }

  &-case {
    min-height: $case_panel;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #fff;
    margin-top: 40rpx;

    display: flex;
    flex-direction: column;

    &-tip {
      height: 60rpx;
      line-height: 60rpx;
      margin: 20rpx 0 0;
      margin-left: 40rpx;
      font-weight: 600;
      font-size: 30rpx;
    }

    &-list {
      flex: 1;
      display: flex;

      &-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        .num {
          font-size: 35rpx;
        }

        .text {
          color: $uni-text-color-placeholder;
        }

        &:nth-child(2) .num {
          color: $uni-color-success;
        }
        &:nth-child(3) .num {
          color: $uni-color-error;
        }
      }
    }
  }

  &-answer-container {
    display: flex;
    flex-direction: column;
    min-height: $answer_panel;

    margin-top: 40rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #fff;
    .tip {
      height: 60rpx;
      line-height: 60rpx;
      margin: 20rpx 0 0;
      margin-left: 40rpx;
      font-weight: 600;
      font-size: 30rpx;
    }

    .answer-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      padding: 20rpx;
      &-item {
        width: 20%;
        height: 100rpx;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        &-index {
          color: $uni-text-color-placeholder;
        }
        &-option {
          color: #19be6b;
          font-size: 32rpx;
          font-weight: 600;
        }
      }
    }
  }

  ::v-deep .u-button {
    margin-top: auto;
    margin-bottom: 40rpx;
    width: 90%;
  }
}

.question-list-item {
  width: 100%;
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f4f4f5;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &-desc {
    display: flex;
    flex-direction: column;
    width: 100%;
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
      .level {
        .tag {
          margin-right: 20rpx;
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
</style>
