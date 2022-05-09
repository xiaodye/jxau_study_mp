<template>
  <view>
    <!-- 头部模块： -->
    <view class="header">
      <image class="header-avatar" :src="headerImage"></image>

      <view class="user">
        <view class="user-info">
          <!-- 用户名： -->
          <text class="user-info-name">{{ userName }}</text>
          <!-- 昵称，签名，性别图标 -->
          <image class="user-info-sex" :src="isMan ? manIcon : womanIcon"></image>

          <view class="user-info-detail" @click="goPersonInfo('././settingInfo/personInfo', 0, {})">
            <u-button size="mini" shape="circle" color="linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);">
              {{ "详细资料" }}
              <u-icon name="arrow-right" :size="rpxToPx(22)" color="#fff"></u-icon>
            </u-button>
          </view>
        </view>

        <!-- 用户签名： -->
        <text class="user-signature">{{ signature }}</text>
      </view>

      <view class="header-menu" @click="goSetting('././settingInfo/setting', 0, {})">
        <u-icon name="setting" :size="rpxToPx(45)"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
import { goDetail } from "@/utils/utils.js"
export default {
  props: {
    userInfo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      headerImage: require("@/static/person/myHeaderPicture.jpg"),
      userName: `Simon`,
      // 设置图标：
      setIcon: require("@/static/person/setting.png"),
      manIcon: require("@/static/person/man.png"),
      womanIcon: require("@/static/person/woman.png"),
      // 注册时接收性别信息，切换昵称后的图标：
      isMan: true,
      signature: `这家伙很懒，什么都没留下`,
    }
  },
  onLoad() {},
  methods: {
    goSetting(path, num, params) {
      goDetail(path, num, params)
    },
    goPersonInfo(path, num, params) {
      goDetail(path, num, params)
    },
  },
}
</script>

<style lang="scss" scoped>
// 头部模块
.header {
  $size: 60rpx;
  position: relative;
  // background-color: #fff;
  padding: 20rpx;
  height: 150rpx;

  display: flex;
  align-items: center;

  // 个人信息指示标签：
  .header-perInfo {
    // width: 200rpx;
    font-size: 25rpx;
    line-height: 45rpx;
    text-indent: 15rpx;
    margin-top: 15rpx;
    float: right;
    border: 1rpx solid silver;
    background-color: white;
    text-align: center;
    margin-right: 70rpx;
    border-radius: 30rpx;
  }

  .header-perInfo:active {
    background-color: #f2f2f8;
  }

  // 个人信息指示标签图标：
  .header-perInfo::after {
    width: 20rpx;
    height: 20rpx;
    content: "";
    display: block;
    float: right;
    margin-top: 10rpx;
    margin-right: 15rpx;
    background: url(../../static/person/right.png) no-repeat 0 0;
    background-size: 100% 100%;
  }

  // 设置图标:
  .header-setIcon {
    width: $size;
    height: $size;
    float: right;
    width: 40rpx;
    height: 40rpx;
    margin-top: 18rpx;
    margin-right: 20rpx;
  }

  // 头部容器
  .header-container {
    width: 100%;

    // 图片容器：
    .header-image-container {
      $width: 100rpx;
      $hun: 100%;
      width: $width;
      height: $width;
      border-radius: 50%;
      background-color: blue;
      overflow: hidden;
      margin: 25rpx;

      // 图片占满容器：
      .header-image {
        // width: $hun;
        // height: $hun;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
    }

    // 用户名：
    .header-userName {
      position: absolute;
      left: 180rpx;
      top: 10rpx;
      font-size: 40rpx;
    }

    // 用户性别图标
    .header-icon {
      position: absolute;
      top: 20rpx;
      left: 310rpx;
      width: 40rpx;
      height: 40rpx;
    }

    // 设置用户签名:
    .header-signature {
      font-size: 30rpx;
      position: absolute;
      top: 70rpx;
      left: 180rpx;
    }
  }
}

//
// fix
.header-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 10rpx solid #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.user {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 30rpx;

  &-info {
    display: flex;
    align-items: center;
    &-name {
      font-size: 42rpx;
      font-weight: bold;
      color: $uni-color-paragraph;
      margin-right: 10rpx;
    }
    &-sex {
      width: 45rpx;
      height: 45rpx;
      margin-right: 10rpx;
    }

    &-detail {
      width: 140rpx;
      margin-left: 10rpx;
    }
  }

  &-signature {
    color: $uni-text-color-disable;
    font-size: 30rpx;
  }
}

.header-menu {
  position: absolute;
  top: 10%;
  right: 5%;
}
</style>
