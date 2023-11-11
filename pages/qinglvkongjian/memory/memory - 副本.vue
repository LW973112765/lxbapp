<template>
	<view class="mainx">
		<view class="mainbox" v-show="photodata.length>0">
			<view class="main">
				<view class="top" @click="toadd">
					<image src="../../../static/images/memory/photo.png" mode=""></image>
					<view>
						新建相册
					</view>
				</view>
				<view class="buttom">
				</view>
			</view>
			<memoryitem :videolist="photodata" v-for="(item, index) in photodata" :key="item.id" :item="item" />
		</view>
		<!-- 提示信息弹窗 -->
		<Loading class="Loading" :show="loading" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photodata: [],
				loading: true,
			};
		},
		onPullDownRefresh() {
			this.http();
		},
		created() {
			this.http();
		},
		onShow() {
			this.http();
			// this.$emit('deleteimgs')
		},
		methods: {
			toadd() {
				uni.navigateTo({
					url: '/pages/qinglvkongjian/memory/addphoto/addphoto',
					animationType: 'zoom-fade-out'
				})
			},

			async http() {
				let res = await this.$zxl('/getxiangce')
				// console.log(res.data, '获取相册');
				if (res.data.status === 200) {
					this.loading = false;
					this.photodata = res.data.data;
				} else {
					this.photodata = []
				}
			},

		}
	}
</script>
<style>
	page {
		background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))
	}
</style>
<style lang="scss" scoped>
	.article {
		width: 100%;
		height: auto;
	}

	.nodata {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		image {
			width: 200rpx;
			height: 200rpx;
		}

		view {
			margin: 0 auto;
			text-align: center;
			color: #999;
			font-size: 30rpx;
		}
	}

	.navScroll .navItem {
		padding: 0 30rpx;
		font-size: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
		display: inline-block;
		transition: all 0.5s;
	}

	page {
		width: 100%;
		height: 100%;
	}

	.navScroll view {
		height: 60rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		transition: all 0.5s;
	}


	.navItem .active {
		border-bottom: 1rpx solid #d43c33;
		color: #d43c33;
		font-size: 40rpx;

	}

	.mainx,
	.mainbox {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		/* align-items:baseline; */
		/* justify-items: flex-start; */

	}

	.mainx {
		padding-bottom: 10rpx;

	}

	.main {
		width: 340rpx;
		height: 400rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin-left: 17rpx;
		margin-right: 17rpx;

	}

	.top {
		position: relative;
		width: 100%;
		height: 250rpx;
		background-color: lightgrey;
		color: #333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.buttom {
		position: relative;
		width: 100%;
		padding: 10rpx 10rpx;
		// background-color: white;
		height: 100rpx;

		view {
			width: 100%;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;

		}

		image {
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			top: 1rpx;
			right: 1rpx;
		}
	}
</style>