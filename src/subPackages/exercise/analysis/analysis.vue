<template>
  <view class="analysis">
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
            :class="[index === activeIndex ? 'active' : '']"
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
        <questionInfo :analysisData="analysisList[activeIndex]"></questionInfo>

        <!-- 解析 -->
        <view class="analysis-main-explain">
          <view class="title">解析</view>
          <view class="content">暂无解析</view>
        </view>
      </view>
    </u-transition>
  </view>
</template>

<script>
import { analysisList } from "@/mock/analysisList.js"
export default {
  components: {},
  data: () => ({
    analysisList: analysisList,
    activeIndex: 0,
    mainShow: true,
  }),
  computed: {
    getCircleBgColor() {
      return isCorrect => (isCorrect ? "#19be6b" : "#f56c6c")
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
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
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

          &.active {
            width: 80rpx;
            height: 80rpx;
            box-shadow: #ff9900 0 0 40rpx;
            border: 2rpx solid #fff;
            font-size: 34rpx;
            font-weight: bold;
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
