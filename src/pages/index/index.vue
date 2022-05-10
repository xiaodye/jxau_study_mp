/**
 * @author lan
 * 首页
 */
<template>
  <view class="home">
    <!-- 导航栏 -->
    <view class="nav" :style="{ height: navHeight + 'px', paddingTop: statusBarHeight + 'px' }">
      <u-search placeholder="搜索文章" :showAction="false" :disabled="true" @click="gotoSearch"></u-search>
    </view>

    <!-- tab栏 -->
    <view class="tab" :style="{ top: navHeight + 'px' }">
      <u-tabs
        :scrollable="false"
        :list="tabList"
        lineWidth="30"
        lineHeight="5"
        :current="tabActiveIndex"
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
        :itemStyle="{ paddingLeft: 30 + 'rpx', paddingRight: 30 + 'rpx', height: 68 + 'rpx' }"
        @click="switchTab"
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
    <swiper
      class="home-list"
      :style="{ height: `${swiperHeight}px`, marginTop: `${rpxToPx(160) + navHeight}px` }"
      :current="tabActiveIndex"
      @change="swiperChangeHandler"
    >
      <!-- 文章 -->
      <swiper-item class="home-list-item">
        <scroll-view scroll-y enable-flex id="content-container-1" @scrolltolower="getMoreArticle">
          <article-list :articleList="contentObj.articleList.data" ref="articleList"></article-list>
          <view class="more">
            <u-loadmore
              v-if="contentObj.articleList.data.length"
              :status="contentObj.articleList.status"
              loading-text="正在加载..."
              nomore-text="~我是有底线的~"
            />
          </view>
        </scroll-view>
      </swiper-item>

      <!-- 视频 -->
      <swiper-item class="home-list-item">
        <scroll-view scroll-y enable-flex id="content-container-2" @scrolltolower="getMoreVideo">
          <video-list :videoList="contentObj.videoList.data" ref="video"></video-list>
          <view class="more">
            <u-loadmore
              v-if="contentObj.videoList.data.length"
              :status="contentObj.videoList.status"
              loading-text="正在加载..."
              nomore-text="~我是有底线的~"
            />
          </view>
        </scroll-view>
      </swiper-item>

      <!-- 资源 -->
      <swiper-item class="home-list-item">
        <scroll-view scroll-y enable-flex id="content-container-3" @scrolltolower="getMoreFile">
          <file-list :fileList="contentObj.fileList.data" ref="file"></file-list>
          <view class="more">
            <u-loadmore
              v-if="contentObj.fileList.data.length"
              :status="contentObj.fileList.status"
              loading-text="正在加载..."
              nomore-text="~我是有底线的~"
            />
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>

    <!-- 跳转 -->
    <view class="go-write" v-if="showWrite" @click="gotoWrite">
      <view class="t-icon t-icon-bianji"></view>
    </view>

    <!-- 加载页 -->
    <u-loading-page :loading="loading"></u-loading-page>
  </view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { articleList } from "@/mock/articleList.js"
import { videoList } from "@/mock/videoList.js"
import { fileList } from "@/mock/fileList.js"
export default {
  components: {},
  mixins: [systemInfo],

  data: () => ({
    tabList: [{ name: "文章" }, { name: "视频" }, { name: "资源" }],
    subTabList: ["最热", "最新"],
    unRecommendHot: false,

    tabActiveIndex: 0, // 当前tab
    subActiveIndex: 0, // 当前子tab

    contentObj: {
      articleList: {
        data: [],
        status: "loadmore",
        totalPages: 0, // 总页数
        paramsData: {
          currentPage: 1, // 当前页数
          pageSize: 5, // 每页最大数据量
        },
        noMore: false,
      },
      videoList: {
        data: [],
        status: "loadmore",
        totalPages: 0,
        paramsData: {
          currentPage: 1,
          pageSize: 5,
        },
        noMore: false,
      },
      fileList: {
        data: [],
        status: "loadmore",
        totalPages: 0,
        paramsData: {
          currentPage: 1,
          pageSize: 5,
        },
        noMore: false,
      },
    },

    // 加载页
    loading: true,
    showWrite: true,
  }),

  methods: {
    // 切换tab
    switchTab({ name, index }) {
      this.tabActiveIndex = index
    },

    // 滑块滚动
    swiperChangeHandler({ detail }) {
      this.tabActiveIndex = detail.current

      // 请求数据
      if (detail.current === 0 && this.contentObj.articleList.data.length === 0) {
        this.getArticleList(this.unRecommendHot)
      } else if (detail.current === 1 && this.contentObj.videoList.data.length === 0) {
        this.getVideoList(this.unRecommendHot)
      } else if (detail.current === 2 && this.contentObj.fileList.data.length === 0) {
        this.getFileList(this.unRecommendHot)
      }
    },

    /**
     * !（已弃用）
     * * 动态舌设置swiper高度，因为swiper只能设置固定高度，swiper-item宽高100%是相对于其父组件
     */
    setSwiperHeight() {
      const contentNodesRef = uni
        .createSelectorQuery()
        .in(this)
        .select(`#content-container-${this.tabActiveIndex + 1}`)

      contentNodesRef
        .boundingClientRect(res => {
          // 保证最小高度，防止选项卡高度太低，导致无法滚动
          if (res.height < this.minSwiperHeight) return (this.swiperHeight = this.minSwiperHeight)
          this.swiperHeight = res.height

          // console.log(this.swiperHeight)
        })
        .exec()
    },

    // 切换子tab
    switchSubTab(item) {
      if (this.tabActiveIndex === 0) {
        this.subActiveIndex = item.index
        this.unRecommendHot = item.text === "最热" ? false : true

        // 重置
        this.contentObj.articleList = {
          data: [],
          status: "loadmore",
          totalPages: 0,
          paramsData: {
            currentPage: 1,
            pageSize: 5,
          },
          noMore: false,
        }
        this.getArticleList(this.unRecommendHot)
      }
    },

    // 获取文章列表
    async getArticleList(flag) {
      this.loading = true
      try {
        const { data: res } = await uni.request({
          url: "/index/get/all/essays/recommend",
          data: {
            currentPage: this.contentObj.articleList.paramsData.currentPage,
            pageSize: this.contentObj.articleList.paramsData.pageSize,
            flag: flag.toString(),
          },
        })
        console.log(res.data, "data")
        if (res.status !== "200") return uni.$u.toast("获取文章失败")
        this.contentObj.articleList.data = res.data.list
        this.contentObj.articleList.totalPages = res.data.pages
      } catch (err) {
        console.error(err)
        uni.$u.toast("服务器异常")
      } finally {
        this.loading = false
      }
    },

    // 获取视频列表
    async getVideoList() {
      this.loading = true
      try {
        const { data: res } = await uni.request({
          url: "/index/get/all/video",
          data: {
            currentPage: this.contentObj.videoList.paramsData.currentPage,
            pageSize: this.contentObj.videoList.paramsData.pageSize,
          },
        })
        console.log(res.data)
        if (res.status !== "200") return uni.$u.toast("获取视频列表失败")
        this.contentObj.videoList.data = res.data.list
        this.$nextTick(() => {
          this.$refs.video.createVideoContextList()
          setTimeout(() => {
            this.$refs.video.firstPlay()
          }, 500)
        })

        if (this.contentObj.videoList.paramsData.currentPage >= this.contentObj.videoList.totalPages) {
          this.contentObj.videoList.status = "nomore"
          this.contentObj.videoList.noMore = true
          return
        }
      } catch (err) {
        console.error(err)
        uni.$u.toast("服务器异常")
      } finally {
        this.loading = false
      }
    },

    // 获取资源列表
    async getFileList() {
      this.loading = true
      try {
        const { data: res } = await uni.request({
          url: "/index/get/all/resource",
          data: {
            currentPage: this.contentObj.fileList.paramsData.currentPage,
            pageSize: this.contentObj.fileList.paramsData.pageSize,
          },
        })
        // console.log(res)
        if (res.status !== "200") return uni.$u.toast("获取文件列表失败")
        this.contentObj.fileList.data = res.data.list
        // 文件状态初始化
        this.$nextTick(() => this.$refs.file.fileStatusListInit())
      } catch (err) {
        console.error(err)
        uni.$u.toast("服务器异常")
      } finally {
        this.loading = false
      }
    },

    // 获取更多文章
    async getMoreArticle() {
      // 节流
      const { status } = this.contentObj.articleList
      if (status === "loading" || status === "nomore") return
      this.contentObj.articleList.status = "loading"

      this.contentObj.articleList.paramsData.currentPage++
      try {
        const { data: res } = await uni.request({
          url: "/index/get/all/essays",
          data: {
            currentPage: this.contentObj.articleList.paramsData.currentPage,
            pageSize: this.contentObj.articleList.paramsData.pageSize,
          },
        })
        // console.log(res.data)
        this.contentObj.articleList.data = [...this.contentObj.articleList.data, ...res.data.list]

        // 到底了
        if (this.contentObj.articleList.paramsData.currentPage >= this.contentObj.articleList.totalPages) {
          this.contentObj.articleList.status = "nomore"
          this.contentObj.articleList.noMore = true
          return
        }
        this.contentObj.articleList.status = "loadmore"
      } catch (err) {
        console.error(err)
        this.contentObj.articleList.status = "loadmore"
        uni.$u.toast("服务器异常")
      }
    },

    // 获取更多视频
    async getMoreVideo() {
      const { status } = this.contentObj.videoList
      if (status === "loading" || status === "nomore") return
      this.contentObj.videoList.status = "loading"

      this.contentObj.videoList.paramsData.currentPage++
      try {
        const { data: res } = await uni.request({
          url: "/index/get/all/video",
          data: {
            currentPage: this.contentObj.videoList.paramsData.currentPage,
            pageSize: this.contentObj.videoList.paramsData.pageSize,
          },
        })
        // console.log(res.data)
        this.contentObj.videoList.data = [...this.contentObj.videoList.data, ...res.data.list]
        // 重新设置内容高度
        this.$nextTick(() => {
          this.$refs.video.createVideoContextList()
        })

        // 到底了
        if (this.contentObj.videoList.paramsData.currentPage >= this.contentObj.videoList.totalPages) {
          this.contentObj.videoList.status = "nomore"
          this.contentObj.videoList.noMore = true
          return
        }
        this.contentObj.videoList.status = "loadmore"
      } catch (err) {
        console.error(err)
        this.contentObj.videoList.status = "loadmore"
        uni.$u.toast("服务器异常")
      }
    },

    // 获取更多资源
    async getMoreFile() {
      const { status } = this.contentObj.fileList
      if (status === "loading" || status === "nomore") return
      this.contentObj.fileList.status = "loading"

      this.contentObj.fileList.paramsData.currentPage++
      try {
        const { data: res } = await uni.request({
          url: "/index/get/all/resource",
          data: {
            currentPage: this.contentObj.fileList.paramsData.currentPage,
            pageSize: this.contentObj.fileList.paramsData.pageSize,
          },
        })
        // console.log(res.data)
        this.contentObj.fileList.data = [...this.contentObj.fileList.data, ...res.data.list]
        // 初始化文件状态
        this.$nextTick(() => this.$refs.file.fileStatusListInit())

        // 到底了
        if (this.contentObj.fileList.paramsData.currentPage >= this.contentObj.fileList.totalPages) {
          this.contentObj.fileList.status = "nomore"
          this.contentObj.fileList.noMore = true
          return
        }
        this.contentObj.fileList.status = "loadmore"
      } catch (err) {
        console.error(err)
        this.contentObj.fileList.status = "loadmore"
        uni.$u.toast("服务器异常")
      }
    },

    // 跳转写文章page
    gotoWrite() {
      uni.navigateTo({ url: "/subPackages/index/write/write" })
    },

    // 跳转搜索page
    gotoSearch() {
      uni.navigateTo({ url: "/subPackages/index/historySearch/historySearch" })
    },
  },

  computed: {
    swiperHeight() {
      return this.windowHeight - (this.rpxToPx(160) + this.navHeight)
    },
  },

  watch: {
    // 是否展示gotoWrite
    tabActiveIndex: {
      handler(val) {
        this.showWrite = val === 0 ? true : false
      },
      immediate: true,
    },
  },

  onLoad() {
    // this.contentObj.articleList.data = articleList
    // this.contentObj.videoList.data = videoList
    // this.contentObj.fileList.data = []
    // this.$nextTick(() => this.setSwiperHeight())
    // this.loading = false

    this.getArticleList(this.unRecommendHot)
  },
}
</script>

<style lang="scss" scoped >
$tab: 160rpx;

.home {
  min-height: 100vh;
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
  overflow: auto;

  scroll-view {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .more {
      height: 60rpx;
      display: flex;
      align-items: center;
    }
  }
}

.go-write {
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcbd71;
  box-shadow: 0 0 20rpx #fcbd71;
  border-radius: 50%;
  right: 10%;
  bottom: 10%;

  .t-icon {
    width: 60rpx;
    height: 60rpx;
  }
}
</style>
