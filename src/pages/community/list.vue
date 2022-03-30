<template>
  <!-- 关于社区的列表 -->
  <view>
    <!-- 最外层容器 -->
    <view class="cummunityList">
      <!-- 中上部选项列表 -->
      <view ref="myOptions" class="cummunityList-options">
        <view class="cummunityList-optCon" v-for="(item, index) in optionList" :key="index">
          {{ item }}
        </view>
      </view>
      <!-- 单个列表内容： -->
      <view class="cummunityList-container">
        <!-- 单个结构 -->
        <!-- 需要包括一个左右布局：左边为一个导航栏，右侧为具体的社区选项 -->
        <!-- 左侧容器： -->
        <view class="cummunityList-leftList">
          <!-- 单个社区左侧的导航栏: -->
          <view class="cummunityList-singleCumm" v-for="(item, index) in leftList" :key="index">
            {{ item }}
          </view>
        </view>
        <!-- 右侧容器: -->
        <view class="cummunityList-rightList">
          <view class="cummunityList-singleCummRight" v-for="(item, index) in rightList" :key="index">
            <image :style="{ width: imgWidth + 'rpx', height: imgHeight + 'rpx' }" :src="item.src"></image>
            <view class="cummunityList-rightListText">
              <text>{{ item.text }}</text>
              <text>{{ item.info }}</text>
            </view>
            <button size="mini" class="cummunityList-btn">加入</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgWidth: "120",
      imgHeight: "120",
      optionList: ["推荐社区", "我的社区"],
      // 选项栏下方的列表:
      // 左侧列表:
      leftList: [
        `大前端`,
        `内推`,
        `后端`,
        `大数据`,
        `求职`,
        `鬼畜`,
        `大前端`,
        `后端`,
        `大数据`,
        `求职`,
        `鬼畜`,
        `大前端`,
        `后端`,
        `大数据`,
        `求职`,
        `鬼畜`,
        `大前端`,
        `内推`,
        `后端`,
        `大数据`,
      ],
      rightList: [
        {
          src: `../../static/cummunity/frontDev.png`,
          text: `前端学习社区`,
          info: `1W成员`,
        },
        {
          src: `../../static/cummunity/afterDev.png`,
          text: `后端学习社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/bigData.png`,
          text: `大数据交流社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/reptile.png`,
          text: `爬虫研究室`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/java.png`,
          text: `Java交流社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/c++.png`,
          text: `C++交流社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/arithmetic.png`,
          text: `算法学习社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/frontDev.png`,
          text: `前端学习社区`,
          info: `1W成员`,
        },
        {
          src: `../../static/cummunity/afterDev.png`,
          text: `后端学习社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/bigData.png`,
          text: `大数据交流社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/reptile.png`,
          text: `爬虫研究室`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/java.png`,
          text: `Java交流社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/c++.png`,
          text: `C++交流社区`,
          info: `1w成员`,
        },
        {
          src: `../../static/cummunity/arithmetic.png`,
          text: `算法学习社区`,
          info: `1w成员`,
        },
      ],
    }
  },
  onUnload() {},
  onLoad() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.cummunityList {
  display: flex;
  flex-direction: column;

  .cummunityList-options {
    display: flex;
    flex-direction: row;
    padding-left: 10rpx;

    .cummunityList-optCon {
      margin: 20rpx;
    }
  }

  // 包括一个左右布局
  .cummunityList-container {
    display: flex;
    flex-direction: row;
    // height: auto;
    justify-content: space-between;
    // 整个左侧列表:
    .cummunityList-leftList {
      flex: 1;
      display: flex;
      font-size: 100%;
      overflow: scroll;
      text-align: center;
      flex-direction: column;
      background-color: white;
      justify-content: space-around;

      // 左侧列表的单个容器布局:
      .cummunityList-singleCumm {
        padding: 30rpx 0 30rpx 0;
        margin: 10rpx;
      }
    }

    .cummunityList-rightList {
      flex: 3;
      background-color: #f4f4f5;
      padding: 0rpx 20rpx 10rpx 20rpx;
      // padding: 20rpx;
      .cummunityList-singleCummRight {
        display: flex;
        flex-direction: row;
        position: relative;
        margin: 0rpx auto 20rpx auto;
        // width: 90%;
        padding: 20rpx;
        align-items: center;
        background-color: white;

        .cummunityList-rightListText {
          display: flex;
          margin-left: 20rpx;
          font-size: 30rpx;
          flex-direction: column;
        }

        .cummunityList-btn {
          // width: 80rpx;
          height: 60rpx;
          font-size: 25rpx;
          position: absolute;
          right: 0;
          margin-right: 20rpx;
          line-height: 60rpx;
        }
      }
    }
  }
}
</style>
