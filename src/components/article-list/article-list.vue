<template>
  <view class="article-container" @click.stop="gotoDetail">
    <view class="article-list" v-if="articleList.length">
      <view class="article-list-item" v-for="item in articleList" :key="item.articleId">
        <!-- 头部 -->
        <view class="article-list-item-header">
          <u-avatar :src="item.avatar" fontSize="16" size="40"></u-avatar>
          <view class="title">
            <view class="text u-line-1">{{ item.title }}</view>
            <view class="user-info">
              <view class="name">{{ item.userName }}</view>
              <view class="date">{{ item.create_time }}</view>
            </view>
          </view>
        </view>

        <!-- 主体 -->
        <view class="article-list-item-main">
          <view class="content">
            <view class="content-text u-line-2">
              {{ item.content }}
            </view>
            <view class="content-tags">
              <my-tag class="tag" size="mini" type="success" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</my-tag>
            </view>
          </view>
          <u-image v-if="item.cover" :showLoading="true" :src="item.cover" width="160rpx" height="120rpx" radius="6px"></u-image>
        </view>

        <!-- 尾部 -->
        <view class="article-list-item-footer">
          <view class="icon" v-for="icon in item.iconList" :key="icon.name">
            <u-icon :name="icon.name" size="24" color="#808080"></u-icon>
            <view>{{ icon.num }}</view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <u-loadmore :status="status" nomore-text="~我是有底线的~" />
    </view>

    <!-- 空白页 -->
    <u-empty v-else class="empty" mode="list" text="文章列表为空"></u-empty>
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
    status: "nomore",
  }),
  computed: {},
  methods: {
    gotoDetail() {
      uni.navigateTo({ url: "/subPackages/index/articleDetail/articleDetail" })
    },
  },

  mounted() {},
}
</script>

<style lang="scss" scoped>
.article-container {
  box-sizing: border-box;
}

.article-list {
  // padding: 15rpx;
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

      .content {
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
