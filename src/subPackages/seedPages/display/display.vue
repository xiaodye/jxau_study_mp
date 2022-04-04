<template>
  <view class="display">
    <view class="display-pic">
      <u-image
        :showLoading="true"
        :src="picUrl"
        :width="rpxToPx(400)"
        :height="rpxToPx(400)"
        :radius="rpxToPx(10)"
        @click="previewImage"
      ></u-image>
    </view>

    <!-- 信息 -->
    <view class="display-info">
      <!-- 种子名称 -->
      <view class="seed-info">
        <view class="seed-info-label">纯度最高种子：</view>
        <view class="seed-info-name">{{ seedInfo.name }}</view>
      </view>

      <!-- 纯度： -->
      <view class="seed-purity">
        <view class="seed-purity-label">纯度：</view>
        <view class="seed-purity-num">
          {{ seedInfo.purity + "%" }}
        </view>
        <my-tag type="error" size="medium">低</my-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    picUrl: "",
    seedInfo: { url: "", name: "油菜花", purity: 23.4 },
  }),
  computed: {},
  methods: {
    // 预览图片
    previewImage() {
      uni.previewImage({ urls: [this.picUrl] })
    },

    // 接收图片
    async getImage() {
      const { data: res } = await uni.request({ url: "get/image", method: "POST" })
      console.log(res)
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.picUrl = options.picUrl
  },
}
</script>

<style lang="scss">
.display {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-pic {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 100rpx 0;
  }

  &-info {
    width: 100%;
    justify-content: center;
    margin-top: 100rpx;
    .seed-info,
    .seed-purity {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 40rpx;

      &-label {
        color: $uni-text-color-placeholder;
      }

      &-name {
        font-weight: bold;
        font-size: 50rpx;
      }

      &-num {
        color: #19be6b;
        margin-right: 30rpx;
      }
    }
    .seed-info {
      margin-bottom: 80rpx;
    }
  }
}
</style>
