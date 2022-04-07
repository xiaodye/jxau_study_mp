<template>
  <view class="reply">
    <!-- 父级评论 -->
    <article-comment :commentList="comment" :showIcons="false"></article-comment>

    <!-- 回复 -->
    <view class="reply-title">
      <view class="reply-title-text">全部回复</view>
      <view class="reply-title-add" @click.stop="openPanel">
        <u-button type="primary" plain hairline text="添加回复" icon="plus" shape="circle" size="small"></u-button>
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
    comment: [
      {
        uuid: "1201030flwfle",
        userName: "稀土君",
        avatarUrl: "https://s2.loli.net/2022/03/17/Rfo5g7ztAcTwGB4.png",
        isAuthor: true,
        content: "3月24日的【掘金夜谈No.1】畅聊 VUE3.0 & 前端技术新趋势已经上线回放，欢迎大家点击直播间链接：live.juejin.cn",
        like: 11,
        callNum: 4,
        create_time: "2022-04-04",
      },
    ],
    replyList: replyList,
  }),
  computed: {},
  methods: {
    // 打开面板
    openPanel() {
      this.$refs.replyPanel.popupShow = true
    },

    async publishReply(value) {
      console.log(value)
      // const { data: res } = await uni.request({ url: "/publish", method: "POST", data: { text: value } })
      // console.log(res)
      setTimeout(() => {
        this.$refs.replyPanel.text = ""
        this.$refs.replyPanel.btn = { text: "发布", loading: false, disabled: false }
        this.$refs.replyPanel.popupShow = false
      }, 1000)
    },
  },
  watch: {},

  onLoad() {
    const screenWidth = uni.getSystemInfoSync().screenWidth
    // console.log(typeof screenWidth)
    // console.log(screenWidth)
    // console.log(uni.getSystemInfoSync().windowHeight)
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
  min-height: 100vh;
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
