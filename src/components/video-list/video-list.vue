<template>
  <view class="video">
    <view class="video-list">
      <view class="video-list-item" v-for="item in videoList" :key="item.uuid">
        <!-- 头部 -->
        <view class="video-list-item-header">
          <u-avatar :src="item.avatar" fontSize="16" size="40"></u-avatar>

          <view class="info">
            <view class="info-name">{{ item.userName }}</view>
            <view class="info-date">{{ $u.timeFrom(Date.parse(item.create_time), false) }}</view>
          </view>
        </view>

        <view class="video-list-item-content">{{ item.title }}</view>

        <!-- 视频容器 -->
        <video
          class="video-list-item-main"
          muted
          loop
          :id="`myVideo${item.uuid}`"
          :autoplay="false"
          :show-center-play-btn="false"
          :show-mute-btn="true"
          enable-play-gesture
          object-fit="cover"
          :poster="item.poster"
          :src="item.videoUrl"
        ></video>

        <!-- footer -->
        <view class="video-list-item-footer">
          <view class="visit">
            <u-avatar-group :urls="avatarList" :size="rpxToPx(50)" gap="0.4"></u-avatar-group>
            <view class="visit-placeholder">等13人看过</view>
          </view>

          <view class="category_tip">
            分类：
            <my-tag size="mini" type="success" :circle="false">{{ item.category }}</my-tag>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    videoList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    videoContextList: [],
    avatarList: [
      "https://cdn.uviewui.com/uview/album/1.jpg",
      "https://cdn.uviewui.com/uview/album/2.jpg",
      "https://cdn.uviewui.com/uview/album/3.jpg",
      "https://cdn.uviewui.com/uview/album/4.jpg",
      "https://cdn.uviewui.com/uview/album/7.jpg",
      "https://cdn.uviewui.com/uview/album/6.jpg",
      "https://cdn.uviewui.com/uview/album/5.jpg",
    ],
  }),
  computed: {},
  methods: {
    createVideoContextList() {
      this.videoList.forEach(item => {
        const videoContext = uni.createVideoContext(`myVideo${item.uuid}`, this)
        this.videoContextList.push(videoContext)
      })
    },

    firstPlay() {
      if (this.videoContextList.length) {
        this.videoContextList[0].play()
      }
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.createVideoContextList()
    this.firstPlay()
  },
}
</script>

<style lang="scss">
.video {
  // padding: 20rpx 0;

  &-list {
    display: flex;
    flex-direction: column;
    &-item {
      padding: 20rpx;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      margin-bottom: 40rpx;
      background-color: #fff;
      border-radius: 30rpx;

      &:last-of-type {
        margin-bottom: 0;
      }

      &-header {
        display: flex;
        align-items: center;
        height: 90rpx;

        .info {
          display: flex;
          justify-content: space-around;
          flex-direction: column;

          margin-left: 20rpx;

          &-name {
            color: $uni-color-title;
            font-weight: bold;
            font-size: 32rpx;
            // margin-bottom: 10rpx;
          }
          &-date {
            color: $uni-text-color-disable;
            font-size: 28rpx;
          }
        }
      }

      &-content {
        margin: 20rpx 0;
        color: $uni-color-paragraph;
        font-size: 32rpx;
      }

      &-main {
        width: 100%;
        height: 400rpx;
        border: none;
        border-radius: 20rpx;
      }

      &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 100rpx;

        .visit {
          display: flex;
          align-items: center;
          &-placeholder {
            margin-left: 10rpx;
            color: $uni-text-color-placeholder;
            font-size: 28rpx;
          }
        }

        .category_tip {
          font-size: 28rpx;
          color: $uni-text-color-placeholder;
          margin-right: 10rpx;
        }
      }
    }
  }
}
</style>

