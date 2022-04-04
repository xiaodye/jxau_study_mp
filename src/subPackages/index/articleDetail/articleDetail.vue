<template>
  <view class="article" :style="{ minHeight: windowHeight + 'px' }">
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
            <view class="aali-tip-view">{{ "阅读 " + articleData.view }}</view>
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
      <!-- 文章内容 -->
      <view class="article-main-content">
        <text>
          {{ articleData.content }}
        </text>
      </view>

      <!-- 文章图片 -->
      <view class="article-main-pics">
        <u-swiper
          :list="articleData.picList"
          indicator
          indicatorMode="dot"
          :previousMargin="rpxToPx(80)"
          :nextMargin="rpxToPx(80)"
          circular
          bgColor="#fff"
          :autoplay="false"
          @click="previewImage"
        ></u-swiper>
      </view>

      <!-- 文章标签 -->
      <view class="article-main-tags">
        <my-tag class="tag" type="success" v-for="(item, index) in articleData.tagList" :key="index">{{ "#" + item }}</my-tag>
      </view>
    </view>

    <!-- 评论 -->
    <article-comment :commentList="articleData.commentList"></article-comment>

    <!-- 底部栏 -->
    <view class="article-bar">
      <!-- 输入框 -->
      <view class="article-bar-input" @click.stop="openPanel">
        <u-input :disabled="true" shape="circle" placeholder="发表评论" prefixIcon="edit-pen"></u-input>
      </view>

      <!-- 点赞与评论 -->
      <view class="article-bar-rg">
        <view class="article-bar-rg-icon">
          <u-icon name="thumb-up" :size="rpxToPx(60)"></u-icon>
          <u-badge type="error" max="99" :value="18" :offset="[-4, -10]" absolute></u-badge>
        </view>
        <view class="article-bar-rg-icon">
          <u-icon name="chat" :size="rpxToPx(60)"></u-icon>
          <u-badge type="error" max="99" :value="6" :offset="[-4, -10]" absolute></u-badge>
        </view>
      </view>
    </view>

    <!-- 评论面板 -->
    <publishPanel @receiveText="publishComment" ref="publishPanel"></publishPanel>
  </view>
</template>

<script>
import ArticleComment from "./components/article-comment.vue"
import { commentList } from "@/mock/commentList.js"
export default {
  components: { ArticleComment },
  props: {},
  data: () => ({
    articleData: {
      userName: "稀土君",
      avatarUrl: "https://s2.loli.net/2022/03/17/Rfo5g7ztAcTwGB4.png",
      title: "尤雨溪携手字节前端专家，畅聊 Vue 3.0 & 前端技术新趋势",
      content: `前端这个技术领域，在应用化以后，涵盖的内容越来越广——纯表现层、应用实现层、应用架构层、基础设施层到改进开发范式的理念层，都有太多可以去钻研的技术点，衍生出了无数前端开发的发展路线。“别更新了，学不动了”成了前端开发群体的切肤之痛，如何在纷繁复杂的前端潮流中找准自己的方向，是年轻前端开发们的群体痛点。
                在过去的几年间，来自尤雨溪及其团队开发的Vue.js获得了国内外前端开发的广泛青睐，从小型企业到中型代理机构，再到市值数十亿美元的上市公司，都有Vue的实践用例。2020年9月18日，Vue 3.0正式发布，提供了更好的性能、更小的捆绑包体积、更好的 TypeScript 集成、用于处理大规模用例的新 API，并为框架未来的长期迭代奠定了坚实的基础。
              `,
      picList: [
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      ],
      tagList: ["前端", "Vue"],
      create_time: "2022/03/17",
      view: 273,
      like: 23,
      comment_num: 7,
      commentList: commentList,
    },
    commentText: "",
  }),
  computed: {},
  methods: {
    // 预览头像
    previewAvatar(url) {
      uni.previewImage({ urls: [url] })
    },

    // 预览图片
    previewImage(index) {
      uni.previewImage({ urls: this.articleData.picList, current: index, loop: true })
    },

    // 获取文章数据
    async getArticleData() {
      const { data: res } = await uni.request({ url: "/get/article", method: "POST", data: { id: "01" } })
      this.articleData = res.data
    },

    // 打开发布面板
    openPanel() {
      this.$refs.publishPanel.popupShow = true
    },

    // 发布评论
    async publishComment(value) {
      console.log(value)
      // const { data: res } = await uni.request({ url: "/publish", method: "POST", data: { text: value } })
      // console.log(res)
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    // this.getArticleData()
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
      @include vertical_center();
      height: 100%;

      &-info {
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
          &-date {
            margin-right: 40rpx;
          }
          &-view {
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
    // padding-bottom: 40rpx;
    &-content {
      color: $uni-color-paragraph;
      margin-bottom: 40rpx;
    }
    // &-pics {
    // }

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
