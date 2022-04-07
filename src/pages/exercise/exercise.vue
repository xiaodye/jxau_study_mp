<template>
  <view class="exercise">
    <view class="exercise-module">
      <view class="exercise-module-lf">
        <view class="title">算法基础</view>
        <view class="t-icon t-icon-algo"></view>
      </view>

      <view class="exercise-module-rg">
        <view class="rg-top">
          <view class="title">竞赛精选</view>
          <view class="t-icon t-icon-race"></view>
        </view>
        <view class="rg-bottom">
          <view class="title">面试宝典</view>
          <view class="t-icon t-icon-interview"></view>
        </view>
      </view>
    </view>

    <!-- tab -->
    <view class="exercise-tab">
      <view class="search">
        <u-search placeholder="搜索题目" :showAction="false"></u-search>
      </view>
      <view class="tag-group">
        <my-tag
          class="tag"
          size="small"
          :type="activeTabIndex === index ? 'primary' : 'info'"
          v-for="(item, index) in tagList"
          :key="index"
          @click="switchTab({ index, name: item })"
        >
          {{ item }}
        </my-tag>
      </view>
    </view>

    <!-- 题目列表 -->
    <question-list :questionList="questionList"></question-list>
  </view>
</template>

<script>
import { questionList } from "@/mock/questionList.js"
export default {
  components: {},
  data: () => ({
    tagList: ["推荐", "最热", "最新"],
    activeTabIndex: 0,
    questionList: questionList,
  }),
  computed: {},
  methods: {
    switchTab(item) {
      // console.log(item)
      this.activeTabIndex = item.index
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
}
</script>

<style lang="scss" scoped>
$module: 400rpx;
$tab: 100rpx;

.exercise {
  height: 100vh;
  background-color: $uni-bg-color-grey;
  box-sizing: border-box;

  &-module {
    display: flex;
    justify-content: space-between;
    height: $module;
    background-color: #fff;
    padding: 30rpx;
    box-sizing: border-box;

    &-lf {
      flex: 3;
      background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
      margin-right: 40rpx;
      border-radius: 20rpx;
      padding: 20rpx;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .title {
        // width: 40%;
        color: #fff;
        font-weight: bold;
        letter-spacing: 6rpx;
        font-size: 45rpx;
      }

      .t-icon-algo {
        width: 140rpx;
        height: 140rpx;
      }
    }

    &-rg {
      flex: 4;
      display: flex;
      flex-direction: column;

      .rg-top,
      .rg-bottom {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20rpx 40rpx;
        border-radius: 20rpx;
      }
      .title {
        color: #fff;
        width: 40%;
        letter-spacing: 6rpx;
        font-weight: bold;
        font-size: 40rpx;
      }

      .rg-top {
        background-image: linear-gradient(to right, #fee140 0%, #fa709a 100%);
        margin-bottom: 20rpx;

        .t-icon-race {
          width: 120rpx;
          height: 120rpx;
        }
      }
      .rg-bottom {
        background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);

        .t-icon-interview {
          width: 100rpx;
          height: 100rpx;
        }
      }
    }
  }

  &-tab {
    height: $tab;

    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 2rpx solid #f3f4f6;
    padding: 0 20rpx;
    margin-top: 20rpx;
    // border-radius: 16rpx;
    box-sizing: border-box;
    .search {
      width: 45%;
    }

    .tag-group {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .tag {
        margin-right: 20rpx;
        &:last-of-type {
          margin: 0;
        }
      }
    }
  }
}
</style>
