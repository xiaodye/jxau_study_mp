<template>
  <scroll-view
    class="question-container"
    :style="{ height: `${windowHeight - 260}px` }"
    scroll-y
    enable-flex
    :refresher-enabled="true"
    refresher-background="#f8f8f8"
    :refresher-triggered="triggered"
    @scrolltolower="onLower"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
  >
    <u-toast ref="uToast"></u-toast>
    <view class="question-list" v-if="questionList.length">
      <view class="question-list-item" v-for="item in questionList" :key="item.id">
        <view class="question-list-item-desc">
          <view class="title u-line-1">{{ item.title }}</view>
          <view class="info">
            <view class="level">
              <my-tag class="tag" :type="levelColor(item.level)" :circle="false" size="mini">{{ item.level }}</my-tag>
              <my-tag class="tag" type="info" size="mini" v-for="tag in item.tagList" :key="tag.tagId">{{ tag.tag }}</my-tag>
            </view>

            <view class="pass">
              <text class="pass-text">通过率：</text>
              <text class="pass-rate">{{ item.passRate + "%" }}</text>
            </view>
          </view>
        </view>

        <u-icon name="arrow-right" size="24" color="#999"></u-icon>
      </view>

      <!-- 加载更多 -->
      <u-loadmore :status="status" loadingText="一大波题目正在赶来" nomoreText="~我是有底线的~" />
    </view>

    <!-- 空白页 -->
    <view v-else class="empty">
      <u-empty mode="data" text="这里什么也没有"></u-empty>
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: {
    questionList: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    windowHeight: 0,
    triggered: false,
    status: "loadmore",
  }),
  computed: {},
  methods: {
    // 自动刷新
    refreshInit() {
      this.triggered = true
    },

    // 自定义下拉控件下拉处理函数
    onPulling() {
      // console.log("自定义下拉刷新控件被下拉")
      if (!this.triggered) this.triggered = true
    },

    // 自定义刷新触发处理函数
    onRefresh() {
      // console.log("自定义下拉刷新被触发")
      // console.log(this.triggered)
      setTimeout(() => {
        this.triggered = false
        this.status = "loadmore"
        this.$refs.uToast.show({
          type: "success",
          message: "刷新成功",
          iconUrl: "https://cdn.uviewui.com/uview/demo/toast/success.png",
        })
      }, 2000)
    },

    // 下拉触底
    onLower() {
      // 防抖
      if (this.status === "loading" || this.status === "nomore") return
      this.status = "loading"
      setTimeout(() => {
        this.status = "nomore"
      }, 3000)
    },

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

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.windowHeight = uni.getSystemInfoSync().windowHeight
    this.refreshInit()
  },
}
</script>

<style lang="scss" scoped>
.question-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
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
        .level {
          margin-right: 40rpx;
          .tag {
            margin-right: 20rpx;
          }
        }
        .pass {
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
