<template>
	<view class="help-container">
		<NavberMine @navbarBtnTap="navbarBtnTapHandler" :title="'积分获得说明'"></NavberMine>
		<view v-for="(item, index) in helpList" :key="index" class="help-row">
			<view class="row-top">
				<image class="icon" :src="item.icon" mode="aspectFill"></image>
				<text class="title">{{item.title}}</text>
			</view>
			<view class="row-bottom">
				<text class=" desc">{{item.desc}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import NavberMine from '../../../components/navbar/navber-mine.vue'
	import {customPrint} from '../../../common/util/util.js'
	
	export default {
		components: {
			NavberMine
		},
		data () {
			return {
				helpList: [
					{
						title: '情侣空间签到',
						icon: '../../../static/images/choujiang/qd.png',
						desc: '签到的天数越多，获得的积分也就越多，获得的积分=已签到天数*15。'
					}, {
						title: '观看视频',
						icon: '../../../static/images/choujiang/sp.png',
						desc: '观看的时间越久，获得的积分也就越多，获得的积分=观看时间（秒）*50，单次获得的积分不超过3000。'
					}, {
						title: '浏览文章',
						icon: '../../../static/images/choujiang/wz.png',
						desc: '浏览的时间越久，获得的积分也就越多，获得的积分=浏览时间（秒）*50，单次获得的积分不超过3000。'
					},
					{
						title: '在线活跃',
						icon: '../../../static/images/choujiang/zx.png',
						desc: '在线的时间越久，获得的积分也就越多，获得的积分=在线时间（秒）*100。'
					}
				]
			}
		},
		methods: {
			navbarBtnTapHandler () {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.help-container {
		height: 100%;
		background-color: #fff;
		
		.help-row {
			padding: 0 20upx;
			
			.row-top {
				margin-top: 20upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				.icon {
					width: 30upx;
					height: 30upx;
				}
				
				.title {
					font-size: $uni-font-size-lg;
					color: $uni-theme-color;
					margin-left: 20upx;
				}
			}
			
			.row-bottom {
				margin-top: 10upx;
				
				.desc {
					font-size: $uni-font-size-base;
					line-height: 35upx;
				}
			}
		}
	}
</style>
