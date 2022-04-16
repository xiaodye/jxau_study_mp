<template>
  <view class="reply">
    <!-- 回复列表 -->
    <view class="reply-list" v-if="replyList.length">
      <view class="reply-list-item" v-for="item in replyList" :key="item.id" hover-class="item_hover">
        <view class="rli-lf">
          <u-avatar :src="item.avatarUrl" :size="rpxToPx(70)"></u-avatar>
        </view>

        <!-- 回复主体 -->
        <view class="rli-rg">
          <view class="rli-rg-user">
            <view class="rli-rg-user-name">{{ item.userName }}</view>
            <view class="rli-rg-user-tag"></view>
          </view>

          <!-- 日期 -->
          <view class="rli-rg-date">{{ item.create_time }}</view>

          <!-- 内容 -->
          <view class="rli-rg-content">{{ item.content }}</view>
        </view>
      </view>
    </view>

    <!-- 空白页 -->
    <!-- 空白页 -->
    <view class="reply-empty" v-else>
      <u-empty text="暂无回复" icon="http://cdn.uviewui.com/uview/empty/message.png"></u-empty>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    replyList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
  watch: {},

  mounted() {},
}
</script>

<style lang="scss" scoped>
.reply {
  &-list {
    .item_hover {
      background-color: #f3f4f6;
    }
    &-item {
      background-color: #fff;
      padding: 20rpx;
      display: flex;

      .rli-lf {
        margin-right: 30rpx;
      }
      .rli-rg {
        flex: 1;
        display: flex;
        flex-direction: column;

        &-user {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 28rpx;
          margin-bottom: 10rpx;
          &-name {
            margin-right: 20rpx;
          }
        }

        &-date {
          color: $uni-text-color-placeholder;
          font-size: 26rpx;
          margin-bottom: 20rpx;
        }

        &-content {
          color: $uni-color-paragraph;
          font-size: 30rpx;
        }
      }
    }
  }
}
</style>
