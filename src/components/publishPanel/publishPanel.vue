<template>
  <u-popup class="panel" :show="popupShow" mode="top" @close="closePopup">
    <view class="panel-container">
      <view class="input-area">
        <u-textarea count focus v-model="text" :showConfirmBar="false"></u-textarea>
      </view>

      <view class="handler">
        <view class="handler-lf">
          <text>回复：</text>
          <text>{{ "@" + "稀土君" }}</text>
        </view>
        <view class="handler-btn" @click.stop="publish">
          <u-button type="primary" icon="play-right" hairline size="small" shape="circle">发布</u-button>
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
    text: "",
  }),
  computed: {},
  methods: {
    // 关闭popup
    closePopup() {
      this.popupShow = false
    },

    // 发布，传递
    publish() {
      if (!this.text.trim().length) return uni.$u.toast("内容不能为空")
      this.$emit("receiveText", this.text.trim())
      this.text = ""
      this.popupShow = false
    },
  },
  watch: {},

  mounted() {},
}
</script>

<style lang="scss" scoped>
.panel-container {
  height: 300rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .input-area {
    height: 70%;
  }
  .handler {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;

    &-lf {
      width: 70%;
      & > text:first-child {
        color: $uni-text-color-placeholder;
      }
      & > text:nth-child(2) {
        color: #71d5a1;
        font-weight: 700;
      }
    }
  }
}
</style>
