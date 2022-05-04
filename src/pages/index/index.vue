/**
 * @author lan
 * 首页
 */
<template>
  <view class="home">
    <!-- 导航栏 -->
    <view class="nav" :style="{ height: navHeight + 'px', paddingTop: statusBarHeight + 'px' }">
      <u-search placeholder="前端" :showAction="false" :disabled="true" @click="gotoSearch"></u-search>
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
      :style="{ height: swiperHeight + 'px', marginTop: `${rpxToPx(160) + navHeight}px` }"
      :current="tabActiveIndex"
      @change="swiperChangeHandler"
    >
      <!-- 文章 -->
      <swiper-item class="home-list-item">
        <view id="content-container-1">
          <article-list :articleList="contentObj.articleList.data" ref="articleList"></article-list>
        </view>
      </swiper-item>

      <!-- 视频 -->
      <swiper-item class="home-list-item">
        <view id="content-container-2">
          <video-list :videoList="contentObj.videoList.data" ref="video"></video-list>
        </view>
      </swiper-item>

      <!-- 资源 -->
      <swiper-item class="home-list-item">
        <view id="content-container-3">
          <file-list :fileList="contentObj.fileList.data" ref="file"></file-list>
        </view>
      </swiper-item>
    </swiper>

    <!-- 跳转 -->
    <view class="go-write" v-if="showWrite" @click="gotoWrite">
      <!-- <u-icon name="attach" :size="rpxToPx(60)" color="#19be6b"></u-icon> -->
      <view class="t-icon t-icon-bianji"></view>
    </view>

    <!-- 加载更多 -->
    <u-loadmore :status="status" loading-text="正在加载..." nomore-text="~我是有底线的~" />

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
    subTabList: ["推荐", "最热", "最新"],

    tabActiveIndex: 0, // 当前tab
    subActiveIndex: 0, // 当前子tab
    swiperHeight: 0, // 选项卡高度

    contentObj: {
      articleList: {
        data: [],
        totalPages: 0, // 总页数
        paramsData: {
          currentPage: 1, // 当前页数
          pageSize: 5, // 每页最大数据量
        },
        noMore: false,
      },
      videoList: {
        data: [],
        totalPages: 0,
        paramsData: {
          currentPage: 1,
          pageSize: 5,
        },
        noMore: false,
      },
      fileList: {
        data: [],
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
    status: "loadmore",
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
      if (detail.current === 0) {
        if (this.contentObj.articleList.noMore) {
          this.status = "nomore"
        } else {
          this.status = "loadmore"
        }

        if (this.contentObj.articleList.data.length === 0) {
          this.getArticleList()
        }
        this.$nextTick(() => this.setSwiperHeight())
      } else if (detail.current === 1) {
        if (this.contentObj.videoList.noMore) {
          this.status = "nomore"
        } else {
          this.status = "loadmore"
        }

        if (this.contentObj.videoList.data.length === 0) {
          this.getVideoList()
        }
        this.$nextTick(() => this.setSwiperHeight())
      } else if (detail.current === 2) {
        if (this.contentObj.fileList.noMore) {
          this.status = "nomore"
        } else {
          this.status = "loadmore"
        }
        if (this.contentObj.fileList.data.length === 0) {
          this.getFileList()
        }
        this.$nextTick(() => this.setSwiperHeight())
      }
    },

    // 动态舌设置swiper高度，因为swiper只能设置固定高度，swiper-item宽高100%是相对于其父组件
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
      this.subActiveIndex = item.index
    },

    // 获取文章列表
    async getArticleList() {
      this.loading = true
      try {
        const { data: res } = await uni.request({
          url: "/index/get/all/essays",
          data: {
            currentPage: this.contentObj.articleList.paramsData.currentPage,
            pageSize: this.contentObj.articleList.paramsData.pageSize,
          },
        })
        console.log(res.data)
        this.contentObj.articleList.data = res.data.list
        this.contentObj.articleList.totalPages = res.data.pages

        // 重新设置内容高度
        this.$nextTick(() => this.setSwiperHeight())
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
        // console.log(res)
        if (res.status !== "200") return uni.$u.toast("获取视频列表失败")
        this.contentObj.videoList.data = res.data.list
        this.$nextTick(() => {
          this.setSwiperHeight()
          this.$refs.video.createVideoContextList()
          // this.$refs.video.firstPlay()
        })
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
        // 重新设置内容高度
        this.$nextTick(() => {
          this.setSwiperHeight()
          this.$refs.file.fileStatusListInit()
        })
      } catch (err) {
        console.error(err)
        uni.$u.toast("服务器异常")
      } finally {
        this.loading = false
      }
    },

    //  加载更多
    async loadMore() {
      // 节流
      if (this.status === "loading" || this.status === "nomore") return
      this.status = "loading"

      // 请求数据
      if (this.tabActiveIndex === 0) {
        this.getMoreArticle()
      } else if (this.tabActiveIndex === 1) {
        this.getMoreVideo()
      } else if (this.tabActiveIndex === 2) {
        this.getMoreFile()
      }
    },

    // 获取更多文章
    async getMoreArticle() {
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
        // 重新设置内容高度
        this.$nextTick(() => this.setSwiperHeight())

        // 到底了
        if (this.contentObj.articleList.paramsData.currentPage >= this.contentObj.articleList.totalPages) {
          this.status = "nomore"
          this.contentObj.articleList.noMore = true
          return
        }
        this.status = "loadmore"
      } catch (err) {
        console.error(err)
        this.status = "loadmore"
        uni.$u.toast("服务器异常")
      }
    },

    // 获取更多视频
    async getMoreVideo() {
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
          this.setSwiperHeight()
          this.$refs.video.createVideoContextList()
        })

        // 到底了
        if (this.contentObj.videoList.paramsData.currentPage >= this.contentObj.videoList.totalPages) {
          this.status = "nomore"
          this.contentObj.videoList.noMore = true
          return
        }
        this.status = "loadmore"
      } catch (err) {
        console.error(err)
        this.status = "loadmore"
        uni.$u.toast("服务器异常")
      }
    },

    // 获取更多资源
    async getMoreFile() {
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
        // 重新设置内容高度
        this.$nextTick(() => {
          this.setSwiperHeight()
          this.$refs.file.fileStatusListInit()
        })

        // 到底了
        if (this.contentObj.fileList.paramsData.currentPage >= this.contentObj.fileList.totalPages) {
          this.status = "nomore"
          this.contentObj.fileList.noMore = true
          return
        }
        this.status = "loadmore"
      } catch (err) {
        console.error(err)
        this.status = "loadmore"
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
    minSwiperHeight() {
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
    // 加载获取内容高度
    // this.contentObj.articleList.data = articleList
    // this.contentObj.videoList.data = videoList
    // this.contentObj.fileList.data = fileList
    // this.$nextTick(() => this.setSwiperHeight())
    // this.loading = false

    this.getArticleList()
  },

  // 监听触底
  onReachBottom() {
    this.loadMore()
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
