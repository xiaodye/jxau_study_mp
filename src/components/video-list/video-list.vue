<template>
  <view class="video">
    <view class="video-list">
      <view class="video-list-item" v-for="item in videoList" :key="item.uuid">
        <!-- 头部 -->
        <view class="video-list-item-header">
          <u-avatar :src="item.avatar" fontSize="16" size="40"></u-avatar>
          <view class="title">
            <view class="text u-line-1">
              <text>{{ item.title }}</text>
            </view>
            <view class="user-info">
              <view class="name">{{ item.userName }}</view>
              <!-- <view class="date">{{ "2022-03-14" }}</view> -->
            </view>
          </view>
        </view>

        <!-- 视频容器 -->
        <video class="video-list-item-main" id="myVideo" :show-mute-btn="true" :src="item.videoUrl"></video>

        <!-- footer -->
        <view class="video-list-item-footer">
          <!-- <u-icon name="clock" :size="rpxToPx(40)" color="#909399"></u-icon> -->
          <view class="date">{{ item.create_time }}</view>
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
    src: "",
  }),
  computed: {},
  methods: {
    // 上传视频
    async uploadVideo() {
      const res = await uni.chooseVideo({ sourceType: ["camera", "album"] })
      this.src = res.tempFilePath
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
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
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      // border-top: 1rpx solid #f4f4f5;

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
            font-size: 30rpx;
            font-weight: bold;
          }

          .user-info {
            display: flex;
            align-items: center;
            font-size: $uni-font-size-base;
            color: #71d5a1;
            font-weight: 600;
            .name {
              margin-right: 25rpx;
            }
          }
        }
      }

      &-main {
        width: 100%;
        height: 350rpx;
        border: none;
        // border-radius: 15rpx;
      }

      &-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 80rpx;
        margin-right: 20rpx;
        // border-top: 1rpx solid #f4f4f5;

        .date {
          margin-left: 10rpx;
          color: #909399;
        }
      }
    }
  }
}
</style>

