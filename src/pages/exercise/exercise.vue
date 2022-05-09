/**
 * @author lan
 * 题库
 */
<template>
  <view class="exercise">
    <view class="exercise-module">
      <view class="exercise-module-lf" @click="gotoCateDetail('algo')">
        <view class="title">基础题库</view>
        <view class="t-icon t-icon-algo"></view>
      </view>

      <view class="exercise-module-rg">
        <view class="rg-top" @click="gotoCateDetail('advance')">
          <view class="title">进阶</view>
          <view class="t-icon t-icon-advance"></view>
        </view>
        <view class="rg-bottom" @click="gotoCateDetail('race')">
          <view class="title">困难</view>
          <view class="t-icon t-icon-race"></view>
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

    <!-- 滚动容器 -->
    <scroll-view
      :style="{ height: `${windowHeight - rpxToPx(520)}px` }"
      scroll-y
      enable-flex
      :refresher-enabled="true"
      refresher-background="#f8f8f8"
      :refresher-triggered="triggered"
      @scrolltolower="onLower"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
    >
      <!-- 题目列表 -->
      <question-list :questionList="questionList" ref="questionList"></question-list>

      <!-- 加载更多 -->
      <u-loadmore :status="status" loadingText="一大波题目正在赶来" nomoreText="~我是有底线的~" />

      <!-- 消息框 -->
      <u-toast ref="uToast"></u-toast>
    </scroll-view>
  </view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { questionList } from "@/mock/questionList.js"
export default {
  components: {},
  mixins: [systemInfo],
  data: () => ({
    tagList: ["推荐", "最热", "最新"],
    activeTabIndex: 0,
    questionList: [],

    triggered: false,
    status: "loadmore",

    totalPages: 0, // 总页数
    paramsData: {
      currentPage: 1, // 当前页数
      pageSize: 5, // 每页最大数据量
    },
  }),
  computed: {},
  methods: {
    switchTab(item) {
      // console.log(item)
      this.activeTabIndex = item.index
    },

    // goto 分类大块
    gotoCateDetail(key) {
      uni.navigateTo({ url: "/subPackages/exercise/questionCateDetail/questionCateDetail?key=" + key })
    },

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
    async onRefresh() {
      try {
        const { data: res } = await uni.request({
          url: "/question/get/set/information",
          method: "GET",
          data: { currentPage: this.paramsData.currentPage, pageSize: this.paramsData.pageSize },
        })
        // console.log(res)
        if (res.status !== "200") return this.$refs.uToast.show({ type: "error", message: "下拉刷新失败" })

        this.questionList = res.data.list
        this.totalPages = res.data.pages
        this.$refs.uToast.show({ type: "success", message: "刷新成功" })
      } catch (err) {
        this.$refs.uToast.show({ type: "error", message: "服务器异常" })
      } finally {
        this.triggered = false
        this.status = "loadmore"
      }
    },

    // 下拉触底，加载更多
    async onLower() {
      // 节流
      if (this.status === "loading" || this.status === "nomore") return

      this.status = "loading"
      this.paramsData.currentPage++
      try {
        const { data: res } = await uni.request({
          url: "/question/get/set/information",
          method: "GET",
          data: { currentPage: this.paramsData.currentPage, pageSize: this.paramsData.pageSize },
        })
        if (res.status !== "200") return this.$refs.uToast.show({ type: "error", message: "上拉加载失败" })
        this.questionList = [...this.questionList, ...res.data.list]

        // 到底了
        if (this.paramsData.currentPage >= this.totalPages) return (this.status = "nomore")
        this.status = "loadmore"
      } catch (err) {
        console.error(err)
        this.$refs.uToast.show({ type: "error", message: "请求异常" })
        this.status = "loadmore"
      }
    },

    // 获取题组列表
    async getQuestionGroupList() {
      uni.showLoading({ title: "加载中..." })
      try {
        const { data: res } = await uni.request({
          url: "/question/get/set/information",
          method: "GET",
          data: { currentPage: this.paramsData.currentPage, pageSize: this.paramsData.pageSize },
        })
        // console.log(res)
        if (res.status !== "200") return this.$refs.uToast.show({ type: "error", message: "获取题组列表失败" })

        this.questionList = res.data.list
        this.totalPages = res.data.pages
      } catch (err) {
        uni.$u.toast("服务器异常")
      } finally {
        uni.hideLoading()
      }
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {
    // this.questionList = questionList
    this.getQuestionGroupList()
  },
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
        background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
        margin-bottom: 20rpx;

        .t-icon-advance {
          width: 100rpx;
          height: 100rpx;
        }
      }
      .rg-bottom {
        background-image: linear-gradient(to right, #fee140 0%, #fa709a 100%);

        .t-icon-race {
          width: 120rpx;
          height: 120rpx;
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
