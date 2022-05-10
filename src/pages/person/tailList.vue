<template>
  <!-- 关于尾部列表的组件,包含错题本，回答 -->
  <view>
    <!-- 最外层容器,其中内嵌一个标题，其他的服务列表 -->
    <view class="tailList">
      <!-- 包含列表的标题 -->
      <view class="tailList-tittle">
        <text>{{ tittle }}</text>
      </view>
      <!-- 下方为服务列表 -->
      <view class="tailList-serves">
        <!-- 单个服务 -->
        <view class="tailList-serCon" v-for="(item, index) in list" :key="index" @click="gotoDetail(item.path)">
          <image class="tailList-serConIcon" :src="item.src"></image>
          <text>{{ item.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tittle: `更多服务`,
      list: [
        {
          text: `错题本`,
          src: `../../static/person/myWrongExcise.png`,
          path: "/subPackages/person/errorBook/errorBook",
        },
        {
          text: `我的课程`,
          src: `../../static/person/myClass.png`,
        },
        {
          text: `问答`,
          src: `../../static/person/myAskAndAnsower.png`,
        },
        {
          text: `最新活动`,
          src: `../../static/person/myLaestAction.png`,
        },
        {
          text: `招聘信息`,
          src: `../../static/person/myRecruit.png`,
        },
        {
          text: `技能树`,
          src: `../../static/person/mySkillTree.png`,
        },
        {
          text: `我的下载`,
          src: `../../static/person/myDownload.png`,
        },
        {
          text: `考核测试`,
          src: `../../static/person/myTest.png`,
        },
      ],
    }
  },

  methods: {
    gotoDetail(path) {
      uni.navigateTo({ url: path })
    },
  },
}
</script>

<style lang="scss" scoped>
.tailList {
  display: flex;
  flex-direction: column;
  margin: 25rpx;
  background-color: #fff;
  border-radius: 25rpx;
  // 标题处
  .tailList-tittle {
    padding: 15rpx 0rpx 10rpx 25rpx;
    // padding-left: 25rpx;
    // padding-top: 15rpx;
    // padding-bottom: 10rpx;
    font-size: 35rpx;
    border-bottom: 0.1rpx solid white;
  }

  // 服务列表：
  .tailList-serves {
    display: flex;
    flex-direction: row;
    padding-top: 20rpx;
    flex-wrap: wrap;
    // 单个列表：
    .tailList-serCon {
      display: flex;
      width: 25%;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      margin-bottom: 20rpx;
      font-size: 30rpx;
      color: grey;
      // 图标：
      .tailList-serConIcon {
        width: 80rpx;
        height: 80rpx;
        // margin: 10rpx;
        // border-radius: 50%;
      }
    }
  }
}
</style>
