<template>
	<!-- 贴子列表: -->
	<!-- 设计社区的贴子 -->
	<view :style="{ height: Math.floor(this.WindowHeight*0.68)+10 + 'px' }" class="cumPost-mainContainer">
		<!-- 设置滑动事件: -->
		<scroll-view @touchstart="start" @touchmove="move" @touchend="end" scroll-y="true"
			:style="{ height: Math.floor(this.WindowHeight*0.68)+10 + 'px' }" class="cumPost-deputyContainer">
			<view class="cumPost" v-for="(item,index) in obj" :key="index">
				<!-- 第一部分：包括头像，昵称，发布时间 -->
				<view class="cumPost-head">
					<!-- 头像: -->
					<image class="cumPost-headImg" :src="item.src" mode=""></image>
					<!-- 昵称和发布时间：昵称后添加上部分小勋章图标 -->
					<view class="cumPost-nameTime">
						<text class="cumPost-name"
							:style="{fontSize: font_size+'rpx',fontWeight: Bold}">{{item.author}}的发表</text>
						<text :style="{fontSize: font_size-5+'rpx',color: font_color}">{{item.create_time}}</text>
					</view>
				</view>
				<!-- 第二部分：贴子标题和部分内容: -->
				<view class="cumPost-content">
					<!-- 同样是上下布局：标题栏和内容栏: -->
					<view class="cumPost-contentTittle">
						<!-- 其中主轴为x轴 -->
						{{item.title}}
					</view>
					<view class="cumPost-contentInfo">
						{{item.content}}
					</view>
				</view>
				<!-- 第三部分：浏览量，点赞量，评论量 -->
				<view class="comPost-footer">
					<view class="comPost-num" v-for="(target,index) in icons" :key="index">
						<image :src="target.url" mode=""></image>
						<text :style="{fontSize: font_size-10+'rpx'}">{{target.num}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		systemInfo
	} from '../../../mixin.js';
	import {
		obj
	} from '../../../mock/cummunityPost.js'
	export default {
		mixins: [systemInfo],
		created() {
			this.WindowHeight = uni.getSystemInfoSync().windowHeight;
			// this.obj=this.allPosts.comment;
			// console.log('comment:',this.obj);
			this.getAllPosts();
		},
		data() {
			return {
				WindowHeight: 0,
				// 下面是一个对象数组，其中包含的数据为博客的作者，作者的头像，发表时间，发表的标题，发表的部分内容，浏览、点赞、评论数量;
				obj,
				// 字体粗细：
				Bold: 'bold',
				// 头像：
				headUrl: '../../../static/person/myHeaderPicture.jpg',
				// 字体：
				font_size: 35,
				// 字体的颜色：
				font_color: 'grey',
				icons: [{
						url: '../../../static/cummunity/skip.png',
						num: 100
					},
					{
						url: '../../../static/cummunity/like.png',
						num: 100
					},
					{
						url: '../../../static/cummunity/comment.png',
						num: 100
					}
				]
			}
		},
		mounted() {
			
		},
		methods: {
			start(e) {
				console.log(e);
			},
			move(e) {
				console.log(e);
			},
			end(e) {
				console.log(e);
			},
			// 获取所有的贴子:
			getAllPosts(){
				let myAllPost=new Promise((resolve,reject)=>{
					uni.request({
						url: "/discuss/user/get/all/discuss/comment",
						method: 'POST',
						data: {
							pageSize: 100,
							currentPage: 1,
							discussId: 1
						},
						success: (res) => {
							resolve(res);
						},
						fail: (err)=>{
							reject(err);
						}
					})
				})
				myAllPost.then(res=>{
					// console.log('获取所有的贴子:',res);
					let result=res.data;
					console.log('对贴子的处理:',result.data.comment)
					this.obj=result.data.comment;
				}).catch(err=>{
					console.log('请求出错:',err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 社区的贴子:
	// 单个模块分三部分：1，头像，昵称，发布时间；2，标题，部分内容；3，浏览，留言，点赞；
	.cumPost-mainContainer {
		// margin-top: 37%;
		position: relative;
		margin-top: 37%;
		overflow: hidden;

		// height: 800rpx;
		.cumPost-deputyContainer {
			// top: 60%;
			// height: 800rpx;
			background-color: #F4F4F5;
			padding-top: 15rpx;
		}
	}

	.cumPost {
		display: flex;
		position: relative;
		flex-direction: column;
		background-color: white;
		margin: 0 20rpx 20rpx 20rpx;
		border-radius: 10rpx;
		padding-bottom: 10rpx;

		// 第一部分：头像，昵称，发布时间：
		.cumPost-head {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10rpx 0 10rpx 10rpx;
			border-bottom: 1rpx solid silver;

			// 头像部分:
			.cumPost-headImg {
				// position: absolute;
				width: 75rpx;
				height: 75rpx;
				border-radius: 50%;
				background-size: 100% 100%;
				margin-right: 15rpx;
			}

			// 昵称和发布时间:
			.cumPost-nameTime {
				display: flex;
				flex-direction: column;

				// 昵称后的图标:
				.cumPost-name:after {
					content: '';
					display: block;
					background: url(../../../static/cummunity/medal.png) no-repeat 0 0;
					width: 40rpx;
					height: 40rpx;
					margin-top: 5rpx;
					margin-left: 5rpx;
					float: right;
					background-size: cover;
				}
			}
		}

		.cumPost-content {
			display: flex;
			position: relative;
			// 上下布局：
			flex-direction: column;
			padding: 10rpx;

			// 标题栏：
			.cumPost-contentTittle {
				display: flex;
				flex-direction: row;
				font-weight: bold;
				font-size: 40rpx;
				margin-left: 10rpx;
				padding: 10rpx 15rpx 15rpx 15rpx;
			}

			.cumPost-contentInfo {
				font-size: 30rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: grey;
				padding: 5rpx 15rpx 15rpx 15rpx;
				border-bottom: 1rpx solid silver;
			}
		}

		// 处理置顶图标:
		.cumPost-content:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			display: inline-block;
			width: 60rpx;
			height: 60rpx;
			background: url(../../../static/cummunity/setTop.png) no-repeat 0 0;
			background-size: cover;
		}

		.comPost-footer {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;

			.comPost-num {
				display: flex;
				flex-direction: column;
				text-align: center;

				image {
					margin-left: 5rpx;
					width: 35rpx;
					height: 35rpx;
					background-size: 100% 100%;
				}
			}
		}
	}
</style>
