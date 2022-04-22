<template>
  <view class="files">
    <!-- 上传资料 -->
    <!-- <view class="files-upload" hover-class="item_hover">
      <view class="files-upload-title">我要上传文件</view>
      <view class="t-icon t-icon-shangchuanwenjian1"></view>
    </view> -->

    <!-- 分类模块 -->
    <view class="files-cate">
      <view
        class="files-cate-item"
        v-for="(item, index) in fileCate"
        :key="index"
        :style="{ backgroundColor: item.bgColor }"
        @click="gotoFileCate(item.name)"
      >
        <view class="name">{{ item.name }}</view>
        <view class="t-icon" :class="[item.icon]"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {},
  data: () => ({
    fileCate: [
      {
        name: "学习资料",
        bgColor: "#eef6ff",
        icon: "t-icon-biaoqian",
      },
      {
        name: "学习资料",
        bgColor: "#fefbec",
        icon: "t-icon-huiyuanka",
      },
      {
        name: "学习资料",
        bgColor: "#fde5e7",
        icon: "t-icon-daichuli",
      },
      {
        name: "学习资料",
        bgColor: "#e4fcfc",
        icon: "t-icon-gonglve",
      },
    ],
  }),
  computed: {},
  methods: {
    gotoFileCate(name) {
      uni.navigateTo({ url: "/subPackages/index/downloadPage/downloadPage?name=" + name })
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}

.files {
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .item_hover {
    background-color: #f3f4f6;
  }

  &-upload {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 80rpx;
    background-color: #fff;
    padding: 0 40rpx;

    &-title {
      font-size: 34rpx;
      font-weight: 900;
      color: $uni-color-paragraph;
    }

    .t-icon-shangchuanwenjian1 {
      height: 60rpx;
      width: 60rpx;
    }
  }

  &-cate {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-evenly;

    height: 550rpx;
    &-item {
      width: 40%;
      height: 40%;
      padding: 20rpx;

      display: flex;

      background-color: #e4fcfc;
      border-radius: 30rpx 50rpx 30rpx 50rpx;
      box-shadow: rgba(0, 0, 0, 0.1) 0 2rpx 6rpx 0, rgba(0, 0, 0, 0.06) 0 2rpx 4rpx 0;

      .name {
        font-size: 40rpx;
        color: $uni-color-paragraph;
        font-weight: 900;
        font-family: "SimHei";
      }

      .t-icon {
        margin-left: auto;
        margin-top: auto;
        width: 100rpx;
        height: 100rpx;
      }
    }
  }
}
</style>


