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
          fontSize: 20 + 'px',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          fontSize: 17 + 'px',
          transform: 'scale(1)',
        }"
        itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
      ></u-tabs>

      <!-- subTab -->
      <view class="sub-tab">
        <my-tag
          class="tag"
          v-for="(item, index) in subTabList"
          :key="index"
          :type="subActiveIndex === index ? 'success' : 'info'"
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
export default {
  components: {},
  data: () => ({
    statusBarHeight: 0,
    navigationBarHeight: 0,
    navHeight: 0,
    windowHeight: 0,

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

    articleList: [
      {
        articleId: "01",
        avatar: "https://cdn.uviewui.com/uview/album/1.jpg",
        userName: "小染",
        title: "经验分享 | 我的八股文学习路线及攻略路线及攻略",
        cover: "https://cdn.uviewui.com/uview/album/1.jpg",
        date: "2022-03-14",
        content:
          "前几天拿到字节offer了，很开心，也有很多小伙伴私信我问了很多问题，所以在这里简单分享一下我是如何学习八股文的，文章篇幅略长，希望能帮助到有需要的同学或者也是双非大三正在迷茫的你。",
        tags: ["前端", "面试"],
        iconList: [
          {
            name: "eye",
            num: 203,
          },
          {
            name: "thumb-up",
            num: 47,
          },
          {
            name: "chat",
            num: 9,
          },
        ],
      },
      {
        articleId: "02",
        avatar: "https://cdn.uviewui.com/uview/album/2.jpg",
        userName: "ken",
        title: "学习路径 | 学习路径问题，求助",
        cover: "https://cdn.uviewui.com/uview/album/1.jpg",
        date: "2022-03-15",
        content:
          "目前大一，这个假期学java到了多线程，看视频加核心技术卷1，书看了一半多，数据结构学到快速排序，目前在看那本黑皮书，因为学校把数据结构放到大二，感觉太晚了",
        tags: ["Java", "学习"],
        iconList: [
          {
            name: "eye",
            num: 166,
          },
          {
            name: "thumb-up",
            num: 19,
          },
          {
            name: "chat",
            num: 54,
          },
        ],
      },
      {
        articleId: "04",
        avatar: "https://cdn.uviewui.com/uview/album/1.jpg",
        userName: "小染",
        title: "经验分享 | 我的八股文学习路线及攻略路线及攻略",
        // cover: "https://cdn.uviewui.com/uview/album/1.jpg",
        date: "2022-03-14",
        content:
          "前几天拿到字节offer了，很开心，也有很多小伙伴私信我问了很多问题，所以在这里简单分享一下我是如何学习八股文的，文章篇幅略长，希望能帮助到有需要的同学或者也是双非大三正在迷茫的你。",
        tags: ["前端", "面试"],
        iconList: [
          {
            name: "eye",
            num: 203,
          },
          {
            name: "thumb-up",
            num: 47,
          },
          {
            name: "chat",
            num: 9,
          },
        ],
      },
      {
        articleId: "05",
        avatar: "https://cdn.uviewui.com/uview/album/2.jpg",
        userName: "ken",
        title: "学习路径 | 学习路径问题，求助",
        // cover: "https://cdn.uviewui.com/uview/album/1.jpg",
        date: "2022-03-15",
        content:
          "目前大一，这个假期学java到了多线程，看视频加核心技术卷1，书看了一半多，数据结构学到快速排序，目前在看那本黑皮书，因为学校把数据结构放到大二，感觉太晚了",
        tags: ["Java", "学习"],
        iconList: [
          {
            name: "eye",
            num: 166,
          },
          {
            name: "thumb-up",
            num: 19,
          },
          {
            name: "chat",
            num: 54,
          },
        ],
      },
      {
        articleId: "03",
        avatar: "https://cdn.uviewui.com/uview/album/1.jpg",
        userName: "小染",
        title: "经验分享 | 我的八股文学习路线及攻略路线及攻略",
        cover: "https://cdn.uviewui.com/uview/album/1.jpg",
        date: "2022-03-14",
        content:
          "前几天拿到字节offer了，很开心，也有很多小伙伴私信我问了很多问题，所以在这里简单分享一下我是如何学习八股文的，文章篇幅略长，希望能帮助到有需要的同学或者也是双非大三正在迷茫的你。",
        tags: ["前端", "面试"],
        iconList: [
          {
            name: "eye",
            num: 203,
          },
          {
            name: "thumb-up",
            num: 47,
          },
          {
            name: "chat",
            num: 9,
          },
        ],
      },
    ],
  }),

  methods: {
    // get设备信息
    getSystemInfo() {
      this.statusBarHeight = getApp().globalData.statusBarHeight;
      this.navigationBarHeight = getApp().globalData.navigationBarHeight;
      this.windowHeight = getApp().globalData.windowHeight;
      this.navHeight = getApp().globalData.navHeight;
    },

    // 切换子tab
    switchSubTab(item) {
      console.log(item);
      this.subActiveIndex = item.index;
    },
  },

  onLoad() {
    this.getSystemInfo();
  },
};
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
