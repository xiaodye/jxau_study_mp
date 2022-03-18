<template>
  <view class="home" :style="{ minHeight: windowHeight + 'px' }">
    <!-- 导航栏 -->
    <view class="nav" :style="{ height: navHeight + 'px', paddingTop: statusBarHeight + 'px' }">
      <u-search placeholder="前端" :showAction="false" :disabled="true"></u-search>
    </view>

    <!-- tab栏 -->
    <view class="tab" :style="{ top: navHeight + 'px' }">
      <u-tabs
        :scrollable="false"
        :list="tabList"
        lineWidth="30"
        lineHeight="5"
        lineColor="#f56c6c"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: 40 + 'rpx',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          fontSize: 34 + 'rpx',
          transform: 'scale(1)',
        }"
        itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 68rpx;"
      ></u-tabs>

      <!-- subTab -->
      <view class="sub-tab">
        <my-tag
          class="tag"
          v-for="(item, index) in subTabList"
          :key="index"
          :type="subActiveIndex === index ? 'error' : 'info'"
          size="small"
          @click="switchSubTab({ index, text: item })"
        >
          {{ item }}
        </my-tag>
      </view>
    </view>

    <!-- 首页列表 -->
    <view class="home-list" :style="{ marginTop: 80 + navHeight + 'px' }">
      <article-list :articleList="articleList"></article-list>
    </view>
  </view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { articleList } from "@/mock/articleList.js"
export default {
  components: {},
  mixins: [systemInfo],

  data: () => ({
    tabList: [
      {
        name: "文章",
        badge: {
          isDot: true,
        },
      },
      {
        name: "讨论",
      },
      {
        name: "视频",
      },
      {
        name: "资料",
      },
    ],
    subTabList: ["推荐", "最热", "最新"],
    subActiveIndex: 0,
    articleList: articleList,
  }),

  methods: {
    // 切换子tab
    switchSubTab(item) {
      // console.log(item);
      this.subActiveIndex = item.index
    },

    // 检验请求
    async getUserInfo() {
      try {
        const { data: res } = await uni.request({ url: "/user/get" })
        if (res.status !== 0) return console.log("获取用户信息失败")
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    },
  },

  onLoad() {
    this.getSystemInfo()
    // this.getUserInfo()
  },
}
</script>

<style lang="scss" scoped >
$tab: 160rpx;

.home {
  display: flex;
  flex-direction: column;
  background-color: $uni-bg-color-grey;
  box-sizing: border-box;
}

.nav {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  z-index: 99;
  background-color: #fff;
  padding-left: 40rpx;
  padding-right: 240rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab {
  background-color: #ffffff;
  height: $tab;
  // padding-bottom: 20rpx;
  position: fixed;
  z-index: 99;

  width: 100%;
  .sub-tab {
    padding-left: 30rpx;
    margin-top: 20rpx;
    display: flex;
    .tag {
      margin-right: 20rpx;
    }
  }
}

.home-list {
  padding: 20rpx;
  margin-bottom: 100rpx;
}
</style>
