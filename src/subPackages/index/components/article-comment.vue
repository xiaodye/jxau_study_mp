<template>
  <div class="comment">
    <!-- 评论列表 -->
    <view class="comment-list" v-if="commentList.length">
      <view class="comment-list-item" v-for="item in commentList" :key="item.uuid" @click="gotoReply">
        <view class="cli-lf">
          <u-avatar :src="item.avatarUrl" :size="rpxToPx(70)" @click="previewAvatar(item.avatarUrl)"></u-avatar>
        </view>

        <!-- 右侧 -->
        <view class="cli-rg">
          <view class="cli-rg-author">
            <view class="cli-rg-author-name">
              <text>{{ item.userName }}</text>
            </view>
            <my-tag class="cli-rg-author-tag" v-if="item.isAuthor" size="mini" type="success" :circle="false">作者</my-tag>
          </view>
          <view class="cli-rg-content">
            <text>{{ item.content }}</text>
          </view>

          <!-- 评论底部栏：日期、评论、点赞 -->
          <view class="cli-rg-footer">
            <view class="cli-rg-footer-date">{{ item.create_time }}</view>
            <view class="cli-rg-footer-rg" v-if="showIcons">
              <view class="cli-rfr-call">
                <!-- color="#19be6b" -->
                <u-icon name="chat" :size="rpxToPx(45)" color="#808080"></u-icon>
                <text>{{ item.callNum }}</text>
              </view>
              <view class="cli-rfr-like" @click.stop="giveLikeHandler">
                <!-- color="#fa3534" -->
                <u-icon name="thumb-up" :size="rpxToPx(45)" :color="styles.thumbColor"></u-icon>
                <text>{{ item.like }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 空白页 -->
    <view class="comment-empty" v-else>
      <u-empty text="暂无评论" icon="http://cdn.uviewui.com/uview/empty/message.png"></u-empty>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    commentList: {
      type: Array,
      required: true,
    },
    showIcons: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    styles: {
      thumbColor: "#808080",
    },
  }),
  computed: {},
  methods: {
    // 点赞
    giveLikeHandler() {
      if (this.styles.thumbColor === "#3f536e") return (this.styles.thumbColor = "#fa3534")
      this.styles.thumbColor = "#3f536e"
    },
    // 跳转回复页
    gotoReply() {
      uni.navigateTo({ url: "/subPackages/index/reply/reply" })
    },
  },
  watch: {},

  mounted() {},
}
</script>

<style lang="scss" scoped>
@mixin vertical_center($mode: flex-start) {
  display: flex;
  justify-content: $mode;
  align-items: center;
}
.comment {
  // background-color: #fff;
  margin: 0 0 50rpx;

  &-list {
    .item_hover {
      background-color: #f3f4f6;
    }

    &-item {
      padding: 20rpx;
      display: flex;
      background-color: #fff;
      .cli-lf {
        margin-right: 30rpx;
      }

      .cli-rg {
        flex: 1;
        display: flex;
        flex-direction: column;
        &-author {
          @include vertical_center();
          font-weight: 600;
          font-size: 28rpx;
          margin-bottom: 20rpx;

          &-tag {
            margin-left: 20rpx;
          }
        }

        &-content {
          color: $uni-color-paragraph;
        }

        &-footer {
          @include vertical_center(space-between);
          margin-top: 10rpx;
          height: 60rpx;

          &-date {
            color: $uni-text-color-placeholder;
            font-size: 28rpx;
          }

          &-rg {
            width: 35%;
            height: 100%;
            margin-right: 20rpx;
            @include vertical_center(center);
            .cli-rfr-call,
            .cli-rfr-like {
              @include vertical_center();
              // 小优化，增大可点击区域
              height: 100%;
              padding: 0 20rpx;

              & > text {
                color: $uni-text-color-placeholder;
                font-size: 28rpx;
              }
            }
          }
        }
      }
    }
  }
}
</style>
