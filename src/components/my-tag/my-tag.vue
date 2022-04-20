/*
 * 自封装Tag组件
 * 1.支持四种尺寸(rpx单位)
 * 2.支持五种配色
 * 3.支持方形和圆形
 * 4.支持点击事件(已阻止冒泡)
 */

<template>
  <view class="tag-base" :class="[`tag-color-${type}`, `tag-size-${size}`, circle ? 'circle' : '']" @click.stop="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "my-tag",
  props: {
    type: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "small",
    },
    circle: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {
    handleClick() {
      this.$emit("click")
    },
  },

  mounted() {},
}
</script>

<style lang="scss" scoped>
// 基础样式
.tag-base {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

// 尺寸
.tag-size-mini {
  font-size: 22rpx;
  height: 40rpx;
  border-radius: 8rpx;
  padding: 10rpx 20rpx;
  &.circle {
    border-radius: 40rpx;
  }
}
.tag-size-small {
  font-size: 24rpx;
  height: 46rpx;
  border-radius: 10rpx;
  padding: 12rpx 24rpx;
  &.circle {
    border-radius: 46rpx;
  }
}
.tag-size-medium {
  font-size: 26rpx;
  height: 52rpx;
  border-radius: 12rpx;
  padding: 14rpx 28rpx;
  &.circle {
    border-radius: 52rpx;
  }
}
.tag-size-lg {
  font-size: 28rpx;
  height: 58rpx;
  border-radius: 14rpx;
  padding: 16rpx 32rpx;
  &.circle {
    border-radius: 58rpx;
  }
}

// 配色方案
.tag-color-primary {
  color: #2b85e4;
  background-color: #ecf5ff;
}
.tag-color-success {
  color: #18b566;
  background-color: #dbf1e1;
}
.tag-color-warning {
  color: #f29100;
  background-color: #fdf6ec;
}
.tag-color-error {
  color: #fa3534;
  background-color: #fef0f0;
}
.tag-color-info {
  color: #333;
  background-color: #f4f4f5;
}
</style>
