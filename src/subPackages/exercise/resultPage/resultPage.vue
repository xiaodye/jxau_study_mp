<template>
  <view class="result">
    <!-- 总览 -->
    <view class="result-panel">
      <view class="tip">数据分析</view>

      <!-- 题目 -->
      <view class="result-panel-question">
        <view class="title">{{ answerReport.question.title }}</view>

        <view class="info">
          <my-tag class="tag" :type="getLevelColor(answerReport.question.level)" :circle="false" size="mini">
            {{ answerReport.question.level }}
          </my-tag>
          <my-tag class="tag" type="info" size="mini" v-for="tag in answerReport.question.tagList" :key="tag.tagId">
            {{ tag.tag }}
          </my-tag>

          <view class="pass">
            <text class="pass-text">正确率：</text>
            <text class="pass-rate">{{ answerReport.question.passRate + "%" }}</text>
          </view>
        </view>
      </view>

      <!-- chart -->
      <view class="result-panel-chart">
        <view class="result-panel-chart-lf">
          <view class="circle">
            <view class="sub-circle">
              <text class="rate">{{ answerReport.passRate + ".00%" }}</text>
              <text class="text">正确率</text>
            </view>
          </view>
        </view>

        <view class="result-panel-chart-case">
          <view class="tip">作答情况</view>

          <view class="list-item">
            <text class="text">共计：</text>
            <text class="num">{{ answerReport.totalNumber }}</text>
          </view>
          <view class="list-item">
            <text class="text">答对：</text>
            <text class="num">{{ answerReport.correctNumber }}</text>
          </view>
          <view class="list-item">
            <text class="text">答错：</text>
            <text class="num">{{ answerReport.wrongNumber }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- answers-list -->
    <view class="result-answer-container">
      <view class="tip">正确答案</view>
      <view class="answer-list">
        <view class="answer-list-item" v-for="(item, index) in answerReport.answerList" :key="index">
          <text class="answer-list-item-index">{{ index + 1 + "." }}</text>
          <text class="answer-list-item-option">{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 查看解析 -->
    <u-button text="查看解析" shape="circle" color="#19be6b" @click="gotoAnalysis"></u-button>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    answerSheet: null,
    questionGroupId: null,

    answerReport: {
      faultQuestions: [],
      answerList: ["A", "D", "C", "B", "C", "B", "B", ["A", "B"], ["B", "D"], ["A", "B", "C", "D"]],
      question: null,
      passRate: 60,
      totalNumber: 10,
      correctNumber: 6,
      wrongNumber: 4,
    },

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
  }),
  computed: {
    // 根据难度选择tag种类
    getLevelColor() {
      return level => {
        switch (level) {
          case "简单":
            return "success"
          case "中等":
            return "warning"
          case "困难":
            return "error"
          default:
            break
        }
      }
    },
  },
  methods: {
    gotoAnalysis() {
      const questionGroupInfo = {
        QuestionSetId: this.answerReport.question.id,
        answerObj: this.answerSheet,
        faultQuestions: this.answerReport.faultQuestions,
      }
      console.log(this.answerReport.question.id)

      console.log(questionGroupInfo)
      uni.navigateTo({ url: "/subPackages/exercise/analysis/analysis?questionGroupInfo=" + JSON.stringify(questionGroupInfo) })
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.answerReport = JSON.parse(options.answerReport)
    this.answerSheet = JSON.parse(options.answerSheet)
  },
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
@mixin before($bgColor: #2b85e4) {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  height: 80%;
  width: 8rpx;
  border-radius: 4rpx;
  background-color: $bgColor;
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

    .tip {
      position: relative;
      margin: 20rpx;
      margin-bottom: 0;
      font-size: 32rpx;
      color: $uni-color-subtitle;
      font-weight: 700;
      padding-left: 30rpx;

      &::before {
        @include before();
      }
    }

    &-question {
      display: flex;
      flex-direction: column;

      padding: 20rpx;
      border-bottom: 1rpx solid #f4f4f5;

      .title {
        margin-bottom: 20rpx;
        color: $uni-color-paragraph;
        font-weight: 700;
      }

      .info {
        display: flex;
        align-items: center;

        .tag {
          margin-right: 20rpx;
        }

        .pass {
          margin-left: auto;
          font-size: 24rpx;
          color: $uni-text-color-placeholder;
          &-rate {
            color: $uni-color-success;
          }
        }
      }
    }

    &-chart {
      flex: 1;
      display: flex;

      &-lf {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;

        .circle {
          width: 300rpx;
          height: 300rpx;
          border-radius: 50%;
          background-image: linear-gradient(120deg, #2af598 0%, #009efd 100%);
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

          display: flex;
          justify-content: center;
          align-items: center;
          .sub-circle {
            width: 75%;
            height: 75%;
            border-radius: 50%;
            background-color: #fff;

            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            padding: 60rpx 0;

            .rate {
              font-size: 45rpx;
              font-weight: 700;
              color: $uni-color-success;
            }
            .text {
              font-size: 30rpx;
              color: $uni-color-paragraph;
              font-weight: 700;
            }
          }
        }
      }

      &-case {
        flex: 2;

        .tip {
          position: relative;
          margin: 30rpx 0;
          font-size: 32rpx;
          color: $uni-color-subtitle;
          font-weight: 700;
          padding-left: 30rpx;

          &::before {
            @include before();
          }
        }

        .list-item {
          margin: 40rpx 0;
          padding-left: 10rpx;

          .text {
            color: $uni-text-color-placeholder;
            margin-right: 20rpx;
          }

          .num {
            font-size: 35rpx;
          }

          &:nth-of-type(3) .num {
            color: $uni-color-success;
          }
          &:nth-of-type(4) .num {
            color: $uni-color-error;
          }
        }
      }
    }
  }

  &-answer-container {
    display: flex;
    flex-direction: column;
    min-height: $answer_panel;
    padding: 20rpx;

    margin-top: 40rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #fff;
    .tip {
      position: relative;
      margin-bottom: 20rpx;
      font-size: 32rpx;
      color: $uni-color-subtitle;
      font-weight: 700;
      padding-left: 30rpx;

      &::before {
        @include before();
      }
    }

    .answer-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      // padding: 20rpx;
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
</style>
