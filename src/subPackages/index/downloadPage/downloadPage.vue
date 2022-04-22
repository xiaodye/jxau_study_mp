<template>
  <view class="download">
    <file-list :fileList="fileList"></file-list>

    <!-- 打开文件 -->
    <!-- <u-transition :show="showOpenPanel" mode="fade">
      <view class="open" v-if="showOpenPanel"></view>
    </u-transition> -->
  </view>
</template>

<script>
import { fileList } from "@/mock/fileList.js"
export default {
  components: {},
  data: () => ({
    cateName: "",
    fileList: [],
    showOpenPanel: false,
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.cateName = options.name
    this.fileList = fileList
    // console.log(this.cateName)
  },
}
</script>

<style lang="scss" scoped>
.download {
  min-height: 100vh;

  .open {
    position: fixed;
    bottom: 100rpx;
    left: 50%;
    transform: translate(-50%, 0);

    height: 100rpx;
    width: 90%;
    border-radius: 30rpx;
    background-color: #dbf1e1;
  }
}
</style>
