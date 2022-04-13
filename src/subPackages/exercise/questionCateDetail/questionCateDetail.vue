<template>
  <view class="question-cate-detail">
    <!-- 页面头部 -->
    <view class="cate-header" :style="{ paddingTop: navHeight + 'px' }">
      <!-- 描述 -->
      <view class="cate-header-desc">
        <view class="t-icon t-icon-race"></view>

        <view class="cate-header-desc-rg">
          <view class="title">竞赛精选</view>
          <view class="content">从竞赛中精心挑选的题目，非常适合深入学习的题库</view>
        </view>
      </view>

      <!-- 头部白框 -->
      <view class="cate-header-title">
        <view class="cate-header-title-tip">题组列表</view>
        <view class="cate-header-title-search">
          <u-search placeholder="搜索题目" :showAction="false" :height="rpxToPx(50)" clearabled></u-search>
        </view>
      </view>
    </view>

    <!-- 主体 -->
    <view class="cate-main">
      <question-list :questionList="questionList" ref="questionList"></question-list>

      <!-- 加载更多 -->
      <u-loadmore :status="status" loadingText="一大波题目正在赶来" nomoreText="~没有更多了~" />
    </view>
  </view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { questionList } from "@/mock/questionList.js"
export default {
  components: {},
  mixins: [systemInfo],
  data: () => ({
    questionList: questionList,
    status: "loadmore",
  }),
  computed: {},
  methods: {},
  watch: {},

  onLoad() {},

  // 监听下拉触底
  onReachBottom() {
    // 防抖
    if (this.status === "loading" || this.status === "nomore") return

    this.status = "loading"
    setTimeout(() => {
      this.status = "nomore"
    }, 2000)
  },
}
</script>

<style lang="scss">
view {
  box-sizing: border-box;
}

@mixin fixed() {
  position: fixed;
  top: 0;
  left: 0;
}

$header: 500rpx;
$header_title: 100rpx;

.question-cate-detail {
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
}

.cate-header {
  @include fixed();
  z-index: 99;

  height: $header;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #fa709a 0%, #fee140 100%);

  &-desc {
    flex: 1;
    padding: 0 20rpx;
    display: flex;
    align-items: center;

    .t-icon-race {
      width: 200rpx;
      height: 200rpx;
      margin-right: 40rpx;
    }
    &-rg {
      height: 100%;
      width: 60%;

      display: flex;
      flex-direction: column;

      .title {
        font-size: 40rpx;
        font-weight: 800;
        color: #fff;
        letter-spacing: 10rpx;
        margin-top: 40rpx;
      }
      .content {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #ffffff;
      }
    }
  }

  &-title {
    height: $header_title;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 40rpx;
    background-color: #fff;
    border-bottom: 2rpx solid #f3f4f6;
    border-radius: 40rpx 40rpx 0 0;

    &-tip {
      font-size: 36rpx;
      font-weight: 700;
    }

    &-search {
      width: 40%;
    }
  }
}

.cate-main {
  padding-top: $header;
}
</style>
