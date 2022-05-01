<template>
  <view class="reply">
    <!-- 父级评论 -->
    <article-comment :commentList="comment" :showIcons="false"></article-comment>

    <!-- 回复 -->
    <view class="reply-title">
      <view class="reply-title-text">全部回复</view>
      <view class="reply-title-add" @click.stop="openPanel">
        <u-button type="primary" plain hairline text="添加回复" shape="circle" size="small"></u-button>
      </view>
    </view>

    <!-- 回复列表 -->
    <article-reply :replyList="replyList"></article-reply>

    <!-- 回复面板 -->
    <publishPanel @receiveText="publishReply" ref="replyPanel"></publishPanel>
  </view>
</template>

<script>
import ArticleComment from "../components/article-comment.vue"
import ArticleReply from "../components/article-reply.vue"
import { replyList } from "@/mock/replyList.js"
export default {
  components: { ArticleComment, ArticleReply },
  data: () => ({
    comment: [],
    replyList: replyList,
  }),
  computed: {},
  methods: {
    // 打开面板
    openPanel() {
      this.$refs.replyPanel.popupShow = true
    },

    // 获取回复列表
    async getReplyList() {
      try {
        const { data: res } = await uni.request({ url: "/index/get/all/re/comment", data: { parentId: this.comment[0].id } })
        console.log(res)
        if (res.status !== "200") return uni.$u.toast("获取回复列表失败")
        this.replyList = res.data.comment
        console.log(this.replyList)
      } catch (err) {
        console.error(err)
        uni.$u.toast("请求异常")
      }
    },

    // 回复
    async publishReply(value) {
      try {
        const { data: res } = await uni.request({
          url: "/index/add/re/comment",
          data: {
            parentId: this.comment[0].id,
            commentNumber: this.comment[0].commentNumber,
            content: value,
          },
        })
        console.log(res)
        if (res.status !== "200") return uni.$u.toast("回复失败")
        this.getReplyList()
      } catch (err) {
        console.error(err)
        uni.$u.toast("请求异常")
      } finally {
        this.$refs.replyPanel.text = ""
        this.$refs.replyPanel.btn = { text: "发布", loading: false, disabled: false }
        this.$refs.replyPanel.popupShow = false
      }
    },
  },
  watch: {},

  onLoad(options) {
    let comment = JSON.parse(options.comment)
    this.comment.push(comment)
    this.getReplyList()
  },
}
</script>

<style lang="scss">
// 设置页面背景
page {
  background-color: $uni-bg-color-grey;
}
</style>

<style lang="scss" scoped>
.reply {
  background-color: $uni-bg-color-grey;
  &-title {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: 100rpx;
    margin-top: 30rpx;
    padding: 0 40rpx;
    padding-right: 60rpx;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f3f4f6;
    &-text {
      font-weight: bold;
      font-size: 40rpx;
    }
  }
}
</style>
