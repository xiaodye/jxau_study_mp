<template>
  <view class="searchPage">
    <view class="searchPage-bar">
      <u-search
        v-model="key"
        :clearabled="true"
        focus
        placeholder="请输入关键字"
        @search="searchHandler"
        @custom="searchHandler"
      ></u-search>
    </view>

    <view class="searchPage-list">
      <article-list :articleList="articleList"></article-list>
    </view>
  </view>
</template>

<script>
import { articleList } from "@/mock/articleList.js"
export default {
  components: {},
  data: () => ({
    key: "",
    articleList: [],
  }),
  computed: {},
  methods: {
    // 获取文章列表
    async getArticleList(key) {
      uni.showLoading()
      try {
        const { data: res } = await uni.request({ url: "/index/get/all/essays", data: { title: key } })
        console.log(res)
        if (res.status !== "200") return uni.$u.toast("获取文章列表失败")
        this.articleList = res.data.list
      } catch (err) {
        uni.$u.toast("服务器异常")
      } finally {
        uni.hideLoading()
      }
    },

    // 搜索
    searchHandler(keyword) {
      if (keyword.trim().length) {
        this.getArticleList(keyword)
        this.key = ""
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.key = options.key
    this.getArticleList(this.key)
    this.articleList = articleList
  },
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.searchPage {
  min-height: 100vh;
  background-color: $uni-bg-color-grey;

  &-bar {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100rpx;
    top: 0;
    left: 0;
    padding: 0 20rpx;
    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-list {
    margin-top: 120rpx;
  }
}
</style>