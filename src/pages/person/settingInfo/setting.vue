<template>
	<view>
		<u-cell-group>
			<u-cell v-for="(item,index) in actions" :key="index" :title="item.title" arrow-direction="down">
				<u-icon slot="icon" size="32" :name="item.name"></u-icon>
				<!-- <u-badge count="99" :absolute="false" slot="right-icon"></u-badge> -->
			</u-cell>
		</u-cell-group>
		<!-- 退出按钮: -->
		<button class="myBtn" type="primary" @click="exit('../../login/login',0,{})">退出登录</button>
	</view>
</template>

<script>
	import {goDetail} from '@/utils/utils.js'
	export default {
		data() {
			return {
				actions: [{
						title: '修改用户名',
						name: 'tags',
					},
					{
						title: '修改个性签名',
						name: 'edit-pen',
					},

				]
			};
		},
		onLoad() {},
		methods: {
			exit(path,num,params){
				goDetail(path,num,params);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.myBtn{
		margin: 20rpx 20rpx 0 20rpx;
	}
</style>
