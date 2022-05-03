<template>
	<!-- 个人信息页面: -->
	<view class="personInfo">
		<!-- 包括多个修改信息的选项: -->
		<u-cell-group title-bg-color="rgb(243, 244, 246)">
			<u-cell :titleStyle="{fontWeight: 500}" :title="item.title" v-for="(item, index) in userInfo" :key="index"
				isLink :icon="item.iconUrl" @click="goRepair('././repairInfo/repair',1,userInfo[index])">
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	import {goDetail} from '@/utils/utils.js'
	export default {
		data() {
			return {
				show: false,
				value: '',
				// 本机用户对象:
				userInfo: [{
						title: '用户性别',
						iconUrl: 'https://s2.loli.net/2022/05/02/vFrclnokD3fdIXZ.png',
						value: 'man'
					},
					{
						title: '手机号码',
						iconUrl: 'https://s2.loli.net/2022/05/02/ra8bueIvnBF1dDz.png',
						value: '15297765394'
					},
					{
						title: 'QQ',
						iconUrl: 'https://s2.loli.net/2022/05/02/BP9nzVN8sGDowgH.png',
						value: '2174201308'
					},
					{
						title: '邮箱',
						iconUrl: 'https://s2.loli.net/2022/05/02/Wd7VEl1DL2wT6ng.png',
						value: '2174201308@qq.com'
					},
					{
						title: '职业',
						iconUrl: 'https://s2.loli.net/2022/05/02/dnawvzXE2BPky5G.png',
						value: 'student'
					}, {
						title: '家庭住址',
						iconUrl: 'https://s2.loli.net/2022/05/02/bmtZBiO53Pzjpd8.png',
						value: 'China'
					},
				]
			}
		},
		// 模拟缓存登录的用户信息:
		onLoad() {
			// this.userStorage();
		},
		methods: {
			goRepair(path,num,params){
				goDetail(path,num,params);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.personInfo {
		display: flex;
		flex-direction: column;
	}
</style>
