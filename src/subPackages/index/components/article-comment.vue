<template>
  <div class="comment">
    <!-- 评论列表 -->
    <view class="comment-list" v-if="commentList.length">
      <view class="comment-list-item" v-for="(comment, index) in commentList" :key="comment.uuid" @click="gotoReply(index)">
        <view class="cli-lf">
          <u-avatar :src="comment.avatarUrl" :size="rpxToPx(70)" @click="previewAvatar(comment.avatarUrl)"></u-avatar>
        </view>

        <!-- 右侧 -->
        <view class="cli-rg">
          <view class="cli-rg-author">
            <view class="cli-rg-author-name">
              <text>{{ comment.userName }}</text>
            </view>
            <my-tag class="cli-rg-author-tag" v-if="comment.isAuthor" size="mini" type="success" :circle="false">作者</my-tag>
          </view>
          <view class="cli-rg-content">
            <text>{{ comment.content }}</text>
          </view>

          <!-- 评论底部栏：日期、评论、点赞 -->
          <view class="cli-rg-footer">
            <view class="cli-rg-footer-date">{{ $u.timeFrom(Date.parse(comment.create_time), false) }}</view>
            <view class="cli-rg-footer-rg" v-if="showIcons">
              <view class="cli-rfr-call">
                <!-- color="#19be6b" -->
                <u-icon name="chat" :size="rpxToPx(45)" color="#808080"></u-icon>
                <text>{{ comment.commentNumber }}</text>
              </view>
              <view class="cli-rfr-like" @click.stop="giveLike(comment)">
                <!-- color="#fa3534" -->
                <u-icon name="heart" :size="rpxToPx(45)" :color="getThumbStatus(comment.id)"></u-icon>
                <text>{{ comment.likeNumber }}</text>
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
    hasLikedArr: {
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
  computed: {
    getThumbStatus() {
      return id => {
        return this.hasLikedArr.includes(id) ? "#fa3534" : "#808080"
      }
    },
  },
  methods: {
    // 点赞点击处理函数
    async giveLike(comment) {
      const { data: res } = await uni.request({
        url: "/index/like/one/comment",
        data: { commentId: comment.id, likeNumber: comment.likeNumber },
      })
      if (res.status !== "200") return uni.$u.toast("出错了")
      this.$emit("giveCommentLikeHandler")
    },

    // 跳转回复页
    gotoReply(index) {
      let commentStr = JSON.stringify(this.commentList[index])
      uni.navigateTo({ url: `/subPackages/index/reply/reply?comment=${commentStr}` })
    },
  },
  watch: {},

  mounted() {
    // console.log(this.hasLikedArr, "hasLikedArr")
    // console.log(this.commentList, "commentList")
  },
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
            color: $uni-text-color-disable;
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
