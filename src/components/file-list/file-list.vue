<template>
  <div class="file-container">
    <!-- 文件列表 -->
    <template v-if="fileList.length">
      <view class="file-list">
        <view class="file-list-item" v-for="item in fileList" :key="item.id" @click="openFile(item.id, item.url)">
          <!-- 文件icon -->
          <view class="t-icon" :class="[`t-icon-${item.type}`]"></view>

          <view class="file-list-item-info">
            <view class="name u-line-1">{{ item.name }}</view>
            <view class="size">{{ item.size }}</view>

            <!-- 进度条 -->
            <view class="progress" v-if="getFileProgressStatus(item.id)">
              <u-line-progress
                :percentage="fileStatusObject[item.id].progress"
                :showText="false"
                :height="rpxToPx(10)"
              ></u-line-progress>

              <view class="progress-text">
                {{ fileStatusObject[item.id].progress + "%" }}
              </view>
            </view>

            <!--已下载 -->
            <view class="exist" v-show="fileStatusObject[item.id].isExist">已下载</view>
          </view>

          <!-- 下载 -->
          <view class="file-list-item-download" @click.stop="downloadClickHandler(item.id, item.url)">
            <u-loading-icon
              :show="fileStatusObject[item.id].downloading"
              mode="circle"
              :size="rpxToPx(50)"
              color="#ff9900"
            ></u-loading-icon>

            <!--download-icon -->
            <view v-show="!fileStatusObject[item.id].downloading" class="t-icon t-icon-xiazai"></view>
          </view>
        </view>
      </view>
    </template>

    <!-- 空白页 -->
    <template v-else>
      <u-empty class="empty" icon="http://cdn.uviewui.com/uview/empty/data.png" text="暂无相关资料"></u-empty>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    fileList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    fileStatusObject: {},
    tempFilePath: null,
    localFilePath: null,

    savedFileList: null,
  }),
  computed: {
    // 进度条是否展示
    getFileProgressStatus() {
      return id => {
        // 防止首次渲染报错
        if (this.fileStatusObject[id] !== undefined) return this.fileStatusObject[id].downloading
        return false
      }
    },
  },
  methods: {
    // 获取已保存文件列表
    getSavedFileList() {
      if (uni.getStorageSync("savedFileList")) return (this.savedFileList = JSON.parse(uni.getStorageSync("savedFileList")))
      this.savedFileList = []
    },

    // 文件状态初始化
    fileStatusListInit() {
      this.fileList.forEach(file => {
        let isExist = false
        this.savedFileList.forEach(item => {
          if (item.id === file.id) return (isExist = true)
        })

        this.$set(this.fileStatusObject, file.id, { downloading: false, progress: 0, isExist: isExist })
      })
      console.log(this.fileStatusObject)
    },

    // 点击下载处理函数
    async downloadClickHandler(id, url) {
      // 节流
      if (this.fileStatusObject[id].downloading) return

      // 是否重新下载
      if (this.fileStatusObject[id].isExist) {
        const { cancel } = await uni.showModal({ title: "提示", content: "文件已下载，是否重新下载？" })
        if (cancel) return
      }

      this.downloadFile(id, url)

      // 模拟
      // this.test(id)
    },

    // 下载文件
    downloadFile(id, url) {
      console.log(id, url)

      this.$set(this.fileStatusObject[id], "downloading", true)
      // 发起请求
      const downloadTask = uni.downloadFile({
        url: url,
        success: async ({ tempFilePath, statusCode }) => {
          if (statusCode !== 200) return uni.$u.toast("下载文件失败，请重试")

          // 保存文件
          const savedFilePath = await uni.saveFile({ tempFilePath: tempFilePath })

          // 持久化到本地
          if (!this.savedFileList.length) {
            this.savedFileList.push({ id: id, localFilePath: savedFilePath })
          } else {
            this.savedFileList.forEach((item, index) => {
              // localStorage中已存在
              if (item.id === id) return (this.savedFileList[index].localFilePath = savedFilePath)
              // localStorage中不存在
              if (index === this.savedFileList.length - 1) this.savedFileList.push({ id: id, localFilePath: savedFilePath })
            })
          }

          uni.setStorageSync("savedFileList", JSON.stringify(this.savedFileList))
          this.fileStatusObject[id].isExist = true
          this.$u.toast("下载成功")
        },
        fail: err => {
          console.error(err)
          uni.$u.toast("服务器异常")
        },
        complete: () => {
          this.fileStatusObject[id].downloading = false
        },
      })

      // 监听下载进度
      downloadTask.onProgressUpdate(({ progress }) => {
        this.fileStatusObject[id].progress = progress
        if (progress === 100) {
          downloadTask.abort()
        }
      })
    },

    // 打开文件
    async openFile(id, url) {
      let filePath = ""
      this.savedFileList.forEach(item => {
        if (item.id === id) return (filePath = item.localFilePath.savedFilePath)
      })

      try {
        const { errMsg } = await uni.openDocument({ filePath: filePath })
        // if (errMsg === "openDocument:ok") uni.$u.toast("文件打开成功")
      } catch (err) {
        console.log(err)
        if (err.errMsg === "openDocument:fail filetype not supported") {
          const { confirm } = await uni.showModal({ title: "提示", content: "文件未下载或已被删除，是否下载？" })
          if (confirm) {
            this.downloadFile(id, url)
          }
        }
      }
    },

    // 模拟
    test(id) {
      this.fileStatusObject[id].downloading = true
      setTimeout(() => {
        this.fileStatusObject[id].progress = 100
        setTimeout(() => {
          this.fileStatusObject[id].downloading = false
          this.fileStatusObject[id].isExist = true
          this.$u.toast("下载成功")
        }, 500)
      }, 2000)
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.getSavedFileList()
    // this.fileStatusListInit()
  },
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}

.file-container {
  .file-list {
    padding: 20rpx;
    &-item {
      display: flex;
      align-items: center;

      // height: 150rpx;
      // background-color: #f6f5fc;
      background-color: #fff;
      padding: 20rpx;
      margin-bottom: 20rpx;
      border-radius: 20rpx;

      &:last-of-type {
        margin-bottom: 0;
      }

      > .t-icon {
        width: 100rpx;
        height: 100rpx;
        margin-right: 20rpx;
      }

      &-info {
        width: 65%;
        min-height: 120rpx;
        display: flex;
        flex-direction: column;

        .name {
          color: $uni-color-paragraph;
          font-size: 34rpx;
        }

        .size {
          font-size: 24rpx;
          color: $uni-text-color-disable;
          // margin-bottom: auto;
        }

        .progress {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &-text {
            margin-left: 20rpx;
            font-size: 28rpx;
            color: $uni-text-color-placeholder;
          }
        }

        .exist {
          margin-top: auto;
          font-size: 28rpx;
          color: $uni-text-color-placeholder;
        }
      }

      &-download {
        width: 15%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .t-icon-xiazai {
          width: 60rpx;
          height: 60rpx;
        }
      }
    }
  }
}
</style>

