<template>
  <view class="analysis">
    <!-- 加载页 -->
    <u-loading-page :loading="loading"></u-loading-page>

    <!-- 答题卡 -->
    <view class="analysis-card">
      <view class="analysis-card-type">
        <view class="title">作答情况</view>
        <view class="right">正确</view>
        <view class="mistake">错误</view>
      </view>

      <!-- 答题情况 -->
      <view class="analysis-card-list">
        <view class="index" v-for="(item, index) in analysisList" :key="item.id" @click="selectCircle(index)">
          <view
            class="index-circle"
            :style="{ backgroundColor: getCircleBgColor(item.isCorrect) }"
            :class="[getCircleActiveClass(index, item.isCorrect)]"
          >
            {{ index + 1 }}
          </view>
        </view>
      </view>
    </view>

    <!-- 主体 -->
    <u-transition :show="mainShow" mode="fade-left">
      <view class="analysis-main">
        <!-- 题目信息 -->
        <questionInfo :analysisData="analysisList[activeIndex]" @addWrongBook="addWrongBook"></questionInfo>

        <!-- 解析 -->
        <view class="analysis-main-explain">
          <view class="title">解析</view>
          <view class="content">
            {{ analysisList[activeIndex].hasAnalysis ? analysisList[activeIndex].analysis_content : "暂无解析" }}
          </view>
        </view>
      </view>
    </u-transition>

    <u-notify ref="uNotify" message="Hi uView"></u-notify>
  </view>
</template>

<script>
import { analysisList } from "@/mock/analysisList.js"
export default {
  components: {},
  data: () => ({
    analysisList: [{}],
    activeIndex: 0,
    mainShow: false,
    loading: true,

    questionGroupInfo: null,
  }),
  computed: {
    getCircleBgColor() {
      return isCorrect => (isCorrect ? "#19be6b" : "#f56c6c")
    },

    getCircleActiveClass() {
      return (index, isCorrect) => {
        if (index === this.activeIndex) {
          if (isCorrect) return "active_correct"
          return "active_worng"
        }
      }
    },
  },
  methods: {
    selectCircle(index) {
      // 节流
      if (!this.mainShow) return

      this.mainShow = false
      setTimeout(() => {
        this.activeIndex = index
        this.mainShow = true
      }, 300)
    },

    // 获取题组信息
    getQuestionGroupInfo(info) {
      this.questionGroupInfo = info
    },

    // 获取解析
    async getAnalysisList() {
      this.loading = true
      try {
        const { data: res } = await uni.request({
          url: "/question/user/get/analysis",
          method: "GET",
          data: {
            QuestionSetId: this.questionGroupInfo.QuestionSetId,
            answerObj: this.questionGroupInfo.answerObj,
            faultQuestions: this.questionGroupInfo.faultQuestions,
          },
        })
        console.log(res)
        if (res.status !== "200") return uni.$u.toast("获取解析失败")

        this.analysisList = res.data
      } catch (err) {
        console.error(err)
        uni.$u.toast("请求异常")
      } finally {
        this.loading = false
        this.mainShow = true
      }
    },

    // 添加至错题本
    addWrongBook(questionId, value) {
      this.analysisList.forEach(item => {
        if (item.id === questionId) {
          item.withinWrongBook = value
          if (value) {
            this.$refs.uNotify.success("已添加到错题本")
          } else {
            this.$refs.uNotify.error("已取消添加")
          }
          return
        }
      })
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    // this.getQuestionGroupInfo(JSON.parse(options.questionGroupInfo))
    // this.getAnalysisList()

    // 模拟
    setTimeout(() => {
      this.loading = false
      this.analysisList = analysisList
      this.mainShow = true
    }, 100)
  },
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}

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

.analysis {
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
  padding: 20rpx;

  display: flex;
  flex-direction: column;

  &-card {
    display: flex;
    flex-direction: column;

    // height: 300rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;

    &-type {
      display: flex;
      align-items: center;
      height: 60rpx;
      margin-bottom: 20rpx;

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

      .right,
      .mistake {
        position: relative;
        width: 120rpx;
        text-align: center;
        font-size: 26rpx;
        color: $uni-text-color-disable;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20rpx;
          height: 20rpx;
          border-radius: 50%;
        }
      }
      .right {
        margin-left: auto;
        &::before {
          background-color: #19be6b;
        }
      }
      .mistake {
        &::before {
          background-color: #f56c6c;
        }
      }
    }

    &-list {
      flex: 1;
      display: flex;
      flex-flow: row wrap;

      .index {
        width: 20%;
        min-height: 100rpx;
        display: flex;
        &-circle {
          box-sizing: content-box;
          display: flex;
          justify-content: center;
          align-items: center;

          margin: auto;
          height: 65rpx;
          width: 65rpx;
          border-radius: 50%;
          color: #fff;
          font-size: 30rpx;
          transition: all 0.2s;

          &.active_correct,
          &.active_worng {
            width: 80rpx;
            height: 80rpx;
            border: 2rpx solid #fff;
            font-size: 34rpx;
            font-weight: bold;
          }
          &.active_correct {
            box-shadow: #19be6b 0 0 40rpx;
          }
          &.active_worng {
            box-shadow: #f56c6c 0 0 40rpx;
          }
        }
      }
    }
  }

  &-main {
    margin-top: 40rpx;
    &-explain {
      background-color: #fff;
      border-radius: 20rpx;
      min-height: 200rpx;
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
}
</style>
