<template>
  <view class="article-container">
    <view class="article-list" v-if="articleList.length">
      <view class="article-list-item" v-for="item in articleList" :key="item.articleId">
        <!-- 头部 -->
        <view class="article-list-item-header">
          <u-avatar :src="item.avatar" fontSize="16" size="40"></u-avatar>
          <view class="title">
            <view class="text u-line-1">{{ item.title }}</view>
            <view class="user-info">
              <view class="name">{{ item.userName }}</view>
              <view class="date">{{ item.date }}</view>
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
              <view class="tag" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</view>
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
  data: () => ({}),
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
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
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fdf6ec;
            margin-right: 14rpx;
            padding: 6rpx 24rpx;
            border-radius: 40rpx;
            color: #f29100;
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
