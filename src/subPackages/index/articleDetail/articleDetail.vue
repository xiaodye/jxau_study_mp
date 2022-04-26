<template>
  <view class="article">
    <!-- 文章标题 -->
    <view class="article-caption">
      <text>{{ articleData.title }}</text>
    </view>

    <!-- 作者 -->
    <view class="article-author">
      <view class="article-author-lf">
        <u-avatar :src="articleData.avatarUrl" :size="rpxToPx(80)" @click="previewAvatar(articleData.avatarUrl)"></u-avatar>

        <!-- 用户信息 -->
        <view class="article-author-lf-info">
          <view class="aali-name">{{ articleData.userName }}</view>
          <!-- 日期、阅读量 -->
          <view class="aali-tip">
            <view class="aali-tip-date">{{ articleData.create_time }}</view>
            <view class="aali-tip-view">{{ "阅读：" + articleData.visitNumber }}</view>
          </view>
        </view>
      </view>

      <!-- 右侧私信 -->
      <view class="article-author-rg">
        <u-button type="success" plain hairline size="small" shape="circle">私信</u-button>
      </view>
    </view>

    <!-- 文章主体 -->
    <view class="article-main">
      <!-- 文章图片 -->
      <u-swiper
        :list="articleData.images"
        indicator
        indicatorMode="dot"
        circular
        bgColor="#fff"
        :autoplay="false"
        @click="previewImage"
        :height="rpxToPx(320)"
      ></u-swiper>

      <!-- 文章内容 -->
      <view class="article-main-content">
        <text user-select>
          {{ articleData.content }}
        </text>
      </view>

      <!-- 文章标签 -->
      <view class="article-main-tags">
        <my-tag class="tag" type="success" v-for="(item, index) in articleData.tags" :key="index">{{ "#" + item }}</my-tag>
      </view>
    </view>

    <!-- 评论 -->
    <view class="article-comment-header">全部评论</view>
    <article-comment
      @giveCommentLikeHandler="giveCommentLikeHandler"
      :commentList="commentList"
      :hasLikedArr="hasLikedArr"
    ></article-comment>

    <!-- 底部栏 -->
    <view class="article-bar">
      <!-- 输入框 -->
      <view class="article-bar-input" @click.stop="openPanel">
        <u-input :disabled="true" shape="circle" :fontSize="rpxToPx(25)" placeholder="发表评论" prefixIcon="edit-pen"></u-input>
      </view>

      <!-- 点赞与评论 -->
      <view class="article-bar-rg">
        <view class="article-bar-rg-icon" @click.stop="giveLikeHandler">
          <u-icon name="thumb-up" :size="rpxToPx(60)" :color="articleThumbStatus"></u-icon>
          <u-badge type="error" max="99" :value="articleData.likeNumber" :offset="[-6, -12]" absolute></u-badge>
        </view>
        <view class="article-bar-rg-icon">
          <u-icon name="chat" :size="rpxToPx(60)" color="#808080"></u-icon>
          <u-badge type="error" max="99" :value="articleData.commentNumber" :offset="[-6, -12]" absolute></u-badge>
        </view>
      </view>
    </view>

    <!-- 评论面板 -->
    <publishPanel @receiveText="publishComment" ref="publishPanel"></publishPanel>
  </view>
</template>

<script>
import ArticleComment from "../components/article-comment.vue"
import { commentList } from "@/mock/commentList.js"

export default {
  components: { ArticleComment },
  props: {},
  data: () => ({
    articleId: "",
    articleData: {
      id: uni.$u.guid(20),
      userName: "稀土君",
      avatarUrl: "https://s2.loli.net/2022/03/17/Rfo5g7ztAcTwGB4.png",
      title: "尤雨溪携手字节前端专家，畅聊 Vue 3.0 & 前端技术新趋势",
      content: `前端这个技术领域，在应用化以后，涵盖的内容越来越广——纯表现层、应用实现层、应用架构层、基础设施层到改进开发范式的理念层，都有太多可以去钻研的技术点，衍生出了无数前端开发的发展路线。“别更新了，学不动了”成了前端开发群体的切肤之痛，如何在纷繁复杂的前端潮流中找准自己的方向，是年轻前端开发们的群体痛点。
                在过去的几年间，来自尤雨溪及其团队开发的Vue.js获得了国内外前端开发的广泛青睐，从小型企业到中型代理机构，再到市值数十亿美元的上市公司，都有Vue的实践用例。2020年9月18日，Vue 3.0正式发布，提供了更好的性能、更小的捆绑包体积、更好的 TypeScript 集成、用于处理大规模用例的新 API，并为框架未来的长期迭代奠定了坚实的基础。
              `,
      images: [
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      ],
      tags: ["前端", "Vue"],
      create_time: "2022/03/17",
      visitNumber: 273,
      likeNumber: 23,
      commentNumber: 7,
      thumbStatus: false,
    },
    commentList: commentList,
    hasLikedArr: [],
    styles: {
      thumbColor: "#808080",
    },
    commentText: "",
  }),
  computed: {
    // 获取作者对文章的点赞状态
    articleThumbStatus() {
      return this.articleData.thumbStatus ? "#fa3534" : "#808080"
    },
  },
  methods: {
    // 预览头像
    previewAvatar(url) {
      uni.previewImage({ urls: [url] })
    },

    // 预览图片
    previewImage(index) {
      uni.previewImage({ urls: this.articleData.images, current: index, loop: true })
    },

    // 打开发布面板
    openPanel() {
      this.$refs.publishPanel.popupShow = true
    },

    // 获取文章数据
    async getArticleData() {
      const { data: res } = await uni.request({ url: "/index/get/one/essays", data: { invitationId: this.articleId } })
      this.articleData = res.data
      console.log(res)
    },

    // 获取评论列表
    async getCommentList() {
      const { data: res } = await uni.request({
        url: "/index/get/all/comment",
        data: { invitationId: this.articleId, currentPage: 1, pageSize: 5 },
      })
      console.log(res.data)
      this.commentList = res.data.comment
      this.hasLikedArr = res.data.hasLikedArr
    },

    // 发布评论
    async publishComment(value) {
      try {
        const { data: res } = await uni.request({
          url: "/index/add/one/comment",
          data: {
            userId: "c4512b64edda4d3a8c874e21fa8aab31",
            invitationId: this.articleId,
            commentNumber: this.articleData.commentNumber,
            content: value,
          },
        })
        if (res.status !== "200") return uni.$u.toast("发布评论失败")
        this.getCommentList()
      } catch (err) {
        console.error(err)
        uni.$u.toast("请求异常")
      } finally {
        this.$refs.publishPanel.text = ""
        this.$refs.publishPanel.btn = { text: "发布", loading: false, disabled: false }
        this.$refs.publishPanel.popupShow = false
      }
    },

    // 文章点赞
    async giveLikeHandler() {
      try {
        if (this.articleData.thumbStatus) {
          const { data: res } = await uni.request({
            url: "/index/like/one/essay",
            data: {
              userId: "c4512b64edda4d3a8c874e21fa8aab31",
              likeNumber: this.articleData.likeNumber,
              invitationId: this.articleData.id,
            },
          })
          if (res.status !== "200") return uni.$u.toast("取消点赞失败")

          this.articleData.thumbStatus = false
          this.articleData.likeNumber--
          uni.$u.toast("取消点赞")
        } else {
          const { data: res } = await uni.request({
            url: "/index/like/one/essay",
            data: {
              userId: "c4512b64edda4d3a8c874e21fa8aab31",
              likeNumber: this.articleData.likeNumber,
              invitationId: this.articleData.id,
            },
          })
          if (res.status !== "200") return uni.$u.toast("点赞失败")

          this.articleData.thumbStatus = true
          this.articleData.likeNumber++
          uni.$u.toast("点赞成功")
        }
      } catch (err) {
        console.error(err)
        uni.$u.toast("服务器异常")
      }
    },

    // 评论点赞处理函数
    giveCommentLikeHandler() {
      this.getCommentList()
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.articleId = options.articleId

    this.getArticleData()
    this.getCommentList()
    // this.getHasLikedArr()
  },
}
</script>

<style lang="scss" scoped>
@mixin vertical_center($mode: flex-start) {
  display: flex;
  justify-content: $mode;
  align-items: center;
}

$base_padding: 20rpx;
$article_bar: 100rpx;

.article {
  // @include vertical_center(center);
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
  padding-bottom: $article_bar;
  &-caption {
    background-color: #fff;
    font-weight: 700;
    font-size: 40rpx;
    padding: $base_padding;
  }

  // 作者栏
  &-author {
    @include vertical_center(space-between);
    height: 120rpx;
    background-color: #fff;
    padding: $base_padding;

    &-lf {
      flex: 1;
      margin-right: 30rpx;
      @include vertical_center();
      height: 100%;

      &-info {
        flex: 1;
        margin-left: 30rpx;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .aali-name {
          font-weight: 600;
        }
        .aali-tip {
          @include vertical_center();
          font-size: 30rpx;
          color: $uni-text-color-placeholder;
          &-view {
            margin-left: auto;
            font-size: 28rpx;
            color: $uni-opacity-disabled;
          }
        }
      }
    }
    &-rg {
      margin-right: 20rpx;
    }
  }

  &-main {
    background-color: #fff;
    padding: 20rpx 40rpx;
    &-content {
      color: $uni-color-paragraph;
      margin-top: 40rpx;
    }

    &-tags {
      @include vertical_center();
      background-color: #fff;
      height: 80rpx;
      margin-top: 20rpx;
      .tag {
        margin-right: 20rpx;
      }
    }
  }

  &-comment-header {
    margin-top: 30rpx;
    background-color: #fff;
    height: 100rpx;
    line-height: 100rpx;
    font-weight: bold;
    padding: 0 40rpx;
    font-size: 40rpx;
  }

  &-bar {
    @include vertical_center();
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100rpx;
    width: 100%;
    padding: 0 40rpx;
    background-color: #fff;
    border-top: 1rpx solid #f3f4f6;

    &-input {
      width: 70%;

      ::v-deep .u-input {
        height: 36rpx;
      }
    }

    &-rg {
      @include vertical_center(space-around);
      flex: 1;

      &-icon {
        position: relative;
      }
    }
  }
}
</style>
