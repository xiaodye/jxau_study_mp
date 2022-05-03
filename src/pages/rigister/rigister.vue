<template>
	<view class="prohibition">
		<view class="demo"
			:style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-xiaoxi"></view>
			</view>
		</view>
		<view :style="{marginTop: Math.floor(windowHeight/8) +'rpx'}" class="register">
			<text class="register-tittle">欢迎注册</text>
			<input :style="{cursor: curNum}" type="text" v-for="(item,index) in inpTetx" :key="index"
				:placeholder="item" v-model="inpValues[index]" placeholder-style="text-align: left" />
			<view class="register-button">
				<!-- <button class="register-btnStyle" type="default" @click="getCode">获取验证码</button> -->
				<button class="register-btnStyle" type="default" @click="register">注册</button>
			</view>
			<button class="myBtn" type="default" @click="getCode">获取验证码</button>
		</view>
	</view>
</template>

<script>
	import {
		systemInfo
	} from "@/mixin.js";
	export default {
		mixins: [systemInfo],
		data() {
			return {
				// 光标的位置：
				textPosition: 'center',
				curNum: 2,
				// 下面的数组表示的时输入框需要绑定的文本信息：
				inpValues: [],
				inpTetx: ['请输入您的电话号码', '请输入您的用户名', '请输入您的密码', '请确认您的密码', '请输入验证码'],
				demo: {
					currentWidth: 0,
					top: 0,
					height: 0
				},
			}
		},
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height

		},
		// 使用onLoad生命周期:
		onLoad() {
			this.getSystemInfo()
			console.log(uni.getSystemInfoSync().windowHeight, '获取屏幕尺寸单位')
			// this.getUserInfo()
			// 测试在组件的onLoad生命周期中获取设备高度来调整盒子的上偏移量；
			console.log(uni.getSystemInfoSync())
			this.register();
			// 请求验证码:
			// this.getCode();
		},
		methods: {
			// 注册:
			register() {
				// 比较this.inpValues中的两项关于密码的输入值:
				if (!Object.is(this.inpValues[2], this.inpValues[3])) {
					uni.showModal({
						title: '提示',
						content: '您两次输入的密码不一致，请重新输入!',
						showCancel: false,
						confirmText: '确定'
					});

				} else {
					let myreq = new Promise((resolve, reject) => {
						uni.request({
							url: '/learnTree/user/register',
							method: 'GET',
							data: {
								loginAct: this.inpValues[1],
								passWord: this.inpValues[2],
								phone: this.inpValues[0],
								code: this.inpValues[4]
							},
							success: (res) => {
								// console.log('注册信息!', res);
								resolve(res);
							},
							fail: (err) => {
								console.log('注册失败:', err);
								reject(err);
							}
						})
					})
					myreq.then(res=>{
						console.log(result);
						if (result.data.result === 'False') {
							uni.showModal({
								title: '提示',
								content: '用户名已存在!',
								showCancel: false,
								confirmText: '确定'
							})
						}else{
							uni.showModal({
								tittle: '提示',
								content: '注册成功',
								showCancel: false,
								confirmText: '确定'
							})
						}
					}).catch(err=>{
						console.log(err);
					})
				}
			},
			// 获取验证码:
			userCode() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: '/wechat/user/login/phone/code',
						method: 'GET',
						data: {
							phone: this.inpValues[0]
						},
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						}
					})
				})
			},
			// 得到验证码的函数:
			async getCode() {
				let result = await this.userCode();
				console.log(result);
			}
		}
	}
</script>
<style>
	/* page {
		background-color: pink;
	} */
</style>
<style lang="scss">
	// 导入外部字体:

	.demo {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		font-size: 26rpx;

		.left {
			float: left;
			position: absolute;
			width: max-content;
			height: max-content;
			top: 0;
			bottom: 0;
			left: 20rpx;
			margin: auto;

			.iconfont {
				color: #3C3C3C;
			}
		}
	}

	.register {
		display: flex;
		flex-direction: column;
		position: relative;
		margin: 30rpx 20rpx 20rpx 20rpx;
		justify-content: space-around;
		align-items: center;

		.myBtn {
			width: 220rpx;
			height: 80rpx;
			font-size: 30rpx;
			// padding: 20rpx 15rpx 20rpx 15rpx;
			// margin-top: -200rpx;
			position: absolute;
			bottom: 20%;
			left: 56%;
			line-height: 80rpx;
			text-align: center;
		}

		.register-tittle {
			margin-top: 25rpx;
			margin-bottom: 20rpx;
			font-size: 50rpx;
		}

		input {
			// 每一个输入框均为弹性布局:
			display: flex;
			flex-direction: row;
			width: 75%;
			border-bottom: 1px solid silver;
			height: 80rpx;
			margin: 25rpx;
			font-size: 30rpx;
			text-align: center;
			// border-radius: 40rpx;
		}

		// 第一个输入框:加入一个标识"+86"
		input:nth-of-type(1) {
			text-indent: 10rpx;
			padding-left: 20rpx;
			display: flex;
			caret-color: #EB3142;
			// 弹性布局，分开前部“+86”和输入部分
			flex-direction: row;

		}

		// 为输入用户名的输入框设置图标:
		input:nth-of-type(2)::before {
			content: '';
			display: block;
			width: 54rpx;
			height: 54rpx;
			margin-top: 15rpx;
			margin-right: 10rpx;
			background: url(../../static/register/user.png) no-repeat 0 0;
			background-size: cover;
		}

		// 开始为第一个输入框设置图标:
		input:nth-of-type(3)::before {
			content: '';
			display: block;
			width: 54rpx;
			height: 54rpx;
			margin-top: 15rpx;
			margin-right: 10rpx;
			// background-size: auto auto;
			background: url(../../static/register/password.png) no-repeat 0 0;
			background-size: cover;
		}

		input:nth-of-type(4)::before {
			content: '';
			display: block;
			width: 54rpx;
			height: 54rpx;
			margin-top: 15rpx;
			margin-right: 15rpx;
			background: url(../../static/register/ensurePassword.png) no-repeat 0 0;
			background-size: cover;
		}

		// 为输入电话号码的输入框添加一个"+86"
		input:nth-of-type(1)::before {
			content: "+86";
			display: block;
			border-right: 2rpx solid silver;
			height: 100%;
			background-color: transparent;
			text-align: center;
			line-height: 80rpx;
			padding-right: 10rpx;
			margin-bottom: 10rpx;
			// margin-left: -10rpx;
		}

		// 获得输入验证码的输入框:
		input:nth-of-type(5) {
			display: flex;
			flex-direction: row;
			// align-items: center;
			// justify-content: space-between;
		}

		input:nth-child(6)::before {
			content: "";
			display: block;
			width: 54rpx;
			height: 54rpx;
			margin-top: 15rpx;
			margin-right: 15rpx;
			background: url(../../static/register/testCode.png) no-repeat 0 0;
			background-size: cover;
		}

		// 为输入验证码的输入框添加一个按钮用于获取验证码:
		// input:nth-of-type(5)::after {

		// 	content: "获取验证码";
		// 	border: 1px solid black;
		// 	padding: 10rpx;
		// 	display: block;
		// 	border-radius: 9%;
		// 	background-color: #F4F4F5;

		// }

		.register-button {
			display: flex;
			flex-direction: column;
			width: 75%;
			margin: 20rpx;
			justify-content: space-between;

			.register-btnStyle {
				width: 100%;
				background-image: linear-gradient(135deg, #81FFEF 10%, #F067B4 100%);
				// background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);
				// background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
			}
		}
	}
</style>
