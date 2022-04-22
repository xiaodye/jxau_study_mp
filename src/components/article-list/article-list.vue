<template>
  <view class="article-container">
    <view class="article-list" v-if="articleList.length">
      <view
        class="article-list-item"
        v-for="item in articleList"
        :key="item.id"
        @click.stop="gotoDetail(item.id)"
        hover-class="item_hover"
      >
        <!-- 头部 ,头像，标题，时间-->
        <view class="article-list-item-header">
          <u-avatar :src="item.user.imageUrl" fontSize="16" size="40"></u-avatar>
          <view class="title">
            <view class="text u-line-1">{{ item.title }}</view>
            <view class="user-info">
              <view class="name">{{ item.user.nickName }}</view>
              <view class="date">{{ item.create_time }}</view>
            </view>
          </view>
        </view>

        <!-- 主体 ，内容，封面，标签-->
        <view class="article-list-item-main">
          <view class="content">
            <view class="content-text u-line-2">
              {{ item.content }}
            </view>
            <view class="content-tags">
              <my-tag class="tag" size="mini" type="success" v-for="(tag, index) in item.tag" :key="index">{{ tag }}</my-tag>
            </view>
          </view>

          <!-- 图片 -->
          <u-image
            v-if="item.coverImgUrl"
            :showLoading="true"
            :src="item.coverImgUrl"
            width="160rpx"
            height="120rpx"
            radius="6px"
          ></u-image>
        </view>

        <!-- 尾部，点赞，评论，浏览 -->
        <view class="article-list-item-footer">
          <view class="icon">
            <u-icon name="eye" size="24" color="#808080"></u-icon>
            <view>{{ item.visitNumber }}</view>
          </view>
          <view class="icon">
            <u-icon name="thumb-up" size="24" color="#808080"></u-icon>
            <view>{{ item.likeNumber }}</view>
          </view>
          <view class="icon">
            <u-icon name="chat" size="24" color="#808080"></u-icon>
            <view>{{ item.commentNumber }}</view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <u-loadmore :status="status" loading-text="正在加载..." nomore-text="~我是有底线的~" />
    </view>

    <!-- 空白页 -->
    <u-empty v-else class="empty" icon="http://cdn.uviewui.com/uview/empty/data.png" text="文章列表为空"></u-empty>
  </view>
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    status: "loadmore",
  }),
  computed: {},
  methods: {
    gotoDetail(articleId) {
      uni.navigateTo({ url: "/subPackages/index/articleDetail/articleDetail?articleId=" + articleId })
    },
  },

  mounted() {},
}
</script>

<style lang="scss" scoped>
.article-container {
  box-sizing: border-box;
  padding: 20rpx;
}

.article-list {
  // padding: 15rpx;
  .item_hover {
    background-color: #f3f4f6;
  }

  &-item {
    background-color: #fff;
    margin-bottom: 20rpx;
    padding: 26rpx;
    border-radius: 16rpx;

    &-header {
      height: 90rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      .title {
        height: 100%;
        display: flex;
        margin-left: 20rpx;
        flex-direction: column;
        justify-content: space-between;

        .text {
          font-size: 36rpx;
          font-weight: bold;
        }

        .user-info {
          display: flex;
          align-items: center;
          font-size: $uni-font-size-base;
          color: $uni-text-color-grey;
          .name {
            margin-right: 25rpx;
          }
        }
      }
    }

    &-main {
      display: flex;
      height: 150rpx;

      .content {
        flex: 1;
        font-size: $uni-font-size-paragraph;
        color: $uni-color-paragraph;
        margin-right: 20rpx;

        &-text {
          margin-bottom: 24rpx;
        }
        &-tags {
          display: flex;
          .tag {
            margin-right: 14rpx;
          }
        }
      }

      ::v-deep .u-image {
        margin-left: auto;
      }
    }

    &-footer {
      display: flex;
      // height: 60rpx;
      padding-top: 20rpx;
      // padding-right: 10rpx;
      justify-content: flex-end;
      align-items: center;

      .icon {
        margin-right: 30rpx;
        display: flex;
        align-items: center;
        color: $uni-text-color-disable;
        font-size: $uni-font-size-base;
        & > view {
          margin-left: 4rpx;
          color: #19be6b;
        }
      }
    }
  }
}
</style>
