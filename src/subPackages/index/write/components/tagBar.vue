<template>
  <u-popup :show="popupShow" mode="right" :customStyle="{ width: `${(screenWidth * 3) / 5}px` }" @close="closePopup">
    <view class="tag-bar">
      <view class="tag-bar-title">热门标签</view>

      <!-- 标签组 -->
      <view class="tag-bar-group">
        <my-tag
          class="tag-bar-group-item"
          :type="tag.type"
          v-for="(tag, index) in tagList"
          :key="index"
          @click="tagSelected({ text: tag.text, index })"
        >
          {{ tag.text }}
        </my-tag>
      </view>

      <!-- 添加标签 -->
      <view class="tag-bar-handle">
        <view class="tag-bar-handle-tip">
          已选择
          <text style="color: #dd524d; padding: 0 10rpx">{{ selectedTagList.length }}</text>
          个
        </view>
        <view class="tag-bar-handle-btn">
          <u-button type="error" text="完成" :disabled="btnDisabled" shape="circle" @click="addTagHandler"></u-button>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {},
  data: () => ({
    popupShow: false,
    tagList: [
      {
        type: "info",
        text: "前端",
      },
      {
        type: "info",
        text: "后端",
      },
      {
        type: "info",
        text: "java",
      },
      {
        type: "info",
        text: "javaScript",
      },
      {
        type: "info",
        text: "c++",
      },
      {
        type: "info",
        text: "pyhton",
      },
      {
        type: "info",
        text: "算法",
      },
      {
        type: "info",
        text: "数据结构",
      },
      {
        type: "info",
        text: "数据分析",
      },
      {
        type: "info",
        text: "操作系统",
      },
      {
        type: "info",
        text: "深度学习",
      },
      {
        type: "info",
        text: "人工智能",
      },
      {
        type: "info",
        text: "经验分享",
      },
      {
        type: "info",
        text: "计算机网络",
      },
      {
        type: "info",
        text: "计算机原理",
      },
    ],
    selectedTagList: [],
    defaultTagType: "info",
    btnDisabled: false,
  }),
  computed: {
    screenWidth() {
      return uni.getSystemInfoSync().screenWidth
    },
  },
  methods: {
    // 关闭popup
    closePopup() {
      this.popupShow = false
    },

    // 选中标签
    tagSelected(item) {
      let selectedTagType = ["primary", "success", "warning", "error"]
      if (this.tagList[item.index].type === "info") {
        if (this.selectedTagList.length >= 3) return uni.$u.toast("最多选择三个标签")

        // 从四种中随机选择一个
        this.tagList[item.index].type = selectedTagType[Math.floor(Math.random() * selectedTagType.length)]
        this.selectedTagList.push(item.text)
        // console.log(this.selectedTagList)
      } else {
        this.tagList[item.index].type = "info"
        this.selectedTagList = this.selectedTagList.filter(tag => tag !== item.text)
      }
    },

    // 添加标签，传给父组件
    addTagHandler() {
      this.popupShow = false
      const tagList = JSON.parse(JSON.stringify(this.selectedTagList))

      // 添加close属性
      for (let i = 0; i < tagList.length; i++) {
        tagList[i] = { close: true, text: tagList[i] }
      }
      this.$emit("addTag", tagList)

      // 清空selectedTagList,重置样式
      this.tagList.forEach(tag => (tag.type = "info"))
      // this.selectedTagList.splice(0, this.selectedTagList.length)
      this.selectedTagList = []
    },
  },
  watch: {
    selectedTagList: {
      immediate: true,
      deep: true,
      handler(val) {
        this.btnDisabled = val.length <= 0 ? true : false
      },
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
}
</script>

<style lang="scss" scoped>
.tag-bar {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20rpx;
  height: 100%;

  &-title {
    font-size: 40rpx;
    font-weight: bold;
    margin: 30rpx 0;
    margin-left: 10rpx;
  }

  &-group {
    display: flex;
    flex-wrap: wrap;
    &-item {
      margin: 10rpx;
    }
  }

  &-handle {
    width: 100%;
    height: 200rpx;
    margin-top: 300rpx;

    &-tip {
      color: $uni-text-color-placeholder;
      margin-bottom: 30rpx;
    }
  }
}
</style>
