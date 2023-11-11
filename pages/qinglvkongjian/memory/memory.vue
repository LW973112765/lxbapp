<template>
	<view class="mainx">
		<!-- <view class="header" :style="{opacity:bg}"> -->
		<view class="header">
			<view class="headerson">
				<view class="left" @click="back">
					<image src="../../../static/images/memory/return.png"></image>
				</view>
				<view class="title">
					<view class="shang">
						相册
					</view>
					<view class="xia">
						<text>{{photodata.length}}相册</text>
						<text>{{imagetotal}}照片</text>
						<text>{{videototal}}视频</text>
					</view>
				</view>
				<view class="right" @click="tohome">首页</view>
			</view>
		</view>
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
		<view class="add" @click="uploadphoto">
			<view class="">
				<image src="../../../static/images/choujiang/jnr33.png" mode=""></image>
			</view>
		</view>
		<!-- 提示信息弹窗 -->
		<Loading class="Loading" :show="loading" />
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photodata: [],
				loading: true,
				top: '',
				videototal: 0,
				imagetotal: 0
			};
		},
		onPullDownRefresh() {
			this.http();
		},
		onPageScroll(e) {
			this.top = e.scrollTop
		},
		created() {
			this.http();
			this.gettotal('image')
			this.gettotal('video')
		},
		computed: {
			bg() {
				return this.top / 90
			},
		},
		onShow() {
			this.http();
			this.gettotal('image')
			this.gettotal('video')
			// this.$emit('deleteimgs')
		},
		mounted() {
			setTimeout(() => {
				uni.$emit('updatecover')
			}, 200)
			uni.$on('getremoveid', (msg) => {
				this.$refs.uToast.show({
					type: 'success',
					message: `${msg}成功😊`,
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
					position: 'top'
				})
			})
		},
		methods: {
			uploadphoto() {
				uni.navigateTo({
					url: '/pages/qinglvkongjian/memory/uploadphoto/uploadphoto',
					animationType: 'zoom-fade-out'
				})
			},
			back() {
				uni.navigateBack()
			},
			tohome() {
				uni.reLaunch({
					url: "/pages/index/index",
					animationType: 'zoom-fade-out'
				})
			},
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
			async gettotal(type) {
				let res = await this.$zxl('/getmemorytotal', {
					type
				})
				if (res.data.status === 200) {
					if (type == 'image') {
						this.imagetotal = res.data.data[0].total
					} else {
						this.videototal = res.data.data[0].total
					}
				} else {
					if (type == 'image') {
						this.imagetotal = 0
					} else {
						this.videototal = 0
					}
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

	.mainbox {
		margin-top: 200rpx;
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

	.header {
		width: 750rpx;
		height: 150rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		border-bottom: 1px solid lightgrey;
		position: fixed;
		// background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));
		background-color: whitesmoke;
		z-index: 50;

		.headerson {
			width: 750rpx;
			height: 100rpx;
			position: relative;
			box-sizing: border-box;
			padding-left: 10rpx;
			padding-right: 10rpx;
			z-index: 50;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.left {
			width: 50rpx;
			height: 50rpx;
			// position: fixed;
			// left: 10rpx;
			// top: 80rpx;
			z-index: 10;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}


		.title {
			position: absolute;
			width: auto;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			align-items: center;

			.xia {
				width: 200rpx;
				color: #999;
				font-size: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.add {
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right: 20rpx;
		bottom: 150rpx;
		background-color: white;
		border-radius: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		// z-index: 10;
		view {
			border-radius: 15rpx;
			width: 90rpx;
			z-index: 10;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
		}

		image {
			border-radius: 15rpx;
			width: 50rpx;
			z-index: 10;
			height: 50rpx;
		}
	}

	.add::before {
		content: '';
		position: absolute;
		background: red;
		z-index: -2;
		animation: rotate 3s linear infinite;
		border-top: 200px solid lightcoral;
		border-bottom: 200px solid #05c160;
		border-left: 200px solid orange;
		border-right: 200px solid cornflowerblue;

	}


	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
</style>