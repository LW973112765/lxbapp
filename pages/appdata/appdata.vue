<template>
	<view style="width: 100%;" class="main">
		<view class="add" @click="touser">
			<view class="">
				用户详情
			</view>
		</view>
		<view class="add" @click="tocategory">
			<view class="">
				文章分类
			</view>
		</view>

		<view class="add" @click="todatainfo">
			<view class="">
				数据详情
			</view>
		</view>
		<view class="add" @click="toditu">
			<view class="">
				地图
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			touser() {
				uni.navigateTo({
					url: '/pages/appdata/user/user',
					animationType: 'zoom-fade-out'
				})
			},
			toditu() {
				uni.navigateTo({
					url: '/pages/appdata/map/map',
					animationType: 'zoom-fade-out'
				})
			},
			tocategory() {
				uni.navigateTo({
					url: '/pages/appdata/category/category',
					animationType: 'zoom-fade-out'
				})
			},
			todatainfo() {
				uni.navigateTo({
					url: 'appinfo/appinfo',
					animationType: 'zoom-fade-out'
				})
			},

		}

	};
</script>

<style scoped lang="less">
	.main {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		padding: 30rpx;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	.add {
		margin-right: 42rpx;
		margin-top: 30rpx;
		width: 200rpx;
		height: 100rpx;
		position: relative;
		// background-color: red;
		border-radius: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		view {
			border-radius: 15rpx;
			width: 190rpx;
			z-index: 10;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
		}
	}


	.add::before {
		content: '';
		position: absolute;
		background: red;
		z-index: -2;
		animation: rotate 3s linear infinite;
		border-top: 300px solid lightcoral;
		border-bottom: 300px solid #05c160;
		border-left: 300px solid orange;
		border-right: 300px solid cornflowerblue;

	}
</style>