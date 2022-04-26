<template>
  <view class="download">
    <file-list :fileList="fileList"></file-list>
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
  methods: {
    // 获取文件列表
    async getFileList() {
      uni.showLoading({ title: "加载中..." })
      try {
        const { data: res } = await uni.request({ url: "/test" })
        console.log(res)
        if (res.status !== "200") return uni.$u.toast("获取文件列表失败")

        this.fileList = res.data
      } finally {
        uni.hideLoading()
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.cateName = options.name
    this.fileList = fileList
    // this.getFileList()
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
