<template>
  <view class="pic">
    <u-upload
      :fileList="picList"
      @afterRead="addPic"
      @delete="deletePic"
      name="imgList"
      multiple
      :maxCount="1"
      uploadText="拍照"
      :previewFullImage="true"
      :width="220"
      :height="220"
    ></u-upload>

    <!-- 上传 -->
    <view class="pic-btn">
      <u-button
        type="primary"
        :text="submitBtn.text"
        shape="circle"
        :loading="submitBtn.loading"
        :disabled="submitBtn.disabled"
        @click="submitPic"
      ></u-button>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    picList: [],
    submitBtn: { text: "确定", loading: false, disabled: false },
  }),
  computed: {},
  methods: {
    // 新增图片
    addPic(e) {
      e.file.forEach((imgObj) => {
        this.picList.push(imgObj)
        // console.log(this.picList[0].url)
      })
    },

    // 移除图片
    deletePic(e) {
      this.picList.splice(e.index, 1)
    },

    // 提交
    submitPic() {
      if (!this.picList.length) return uni.$u.toast("请先上传图片")

      this.submitBtn = { text: "提交中", loading: true, disabled: true }
      setTimeout(() => {
        const picUrl = this.picList[0].url
        uni.navigateTo({ url: "/subPackages/seedPages/display/display?picUrl=" + picUrl })
        this.picList.pop()
        this.submitBtn = { text: "确定", loading: false, disabled: false }
      }, 2000)
    },

    // 上传图片
    async uploadPic() {
      const { data: res } = await uni.uploadFile({ url: "/upload/img", files: this.picList[0], name: "file", fileType: "image" })
      uni.$u.toast("上传成功")
      console.log(res)
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
}
</script>

<style lang="scss">
.pic {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 100rpx;

  &-btn {
    width: 100%;
    margin-top: 200rpx;
  }
}
</style>
