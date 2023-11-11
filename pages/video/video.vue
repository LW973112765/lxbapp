<template>
	<view class="mainx">
		<!-- 视频 -->
		<view class="" style="margin-left: 10px;margin-top: 10rpx;">
			视频 {{total}}
		</view>
		<view class="main">
			<VideoItem :videolist="videodata" v-for="(item, index) in videodata" :key="item.id" :item="item" />
		</view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message" animation>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<Loading class="Loading" :show="loading" />
		<view class="load2" v-if="isload">
			<zero-loading class="loadson" position="absolute" v-if="isload"></zero-loading>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				videodata: [],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				loading: true,
				isLoading1: false,
				total: 0,
				isload: false,
				n: 1,
			};
		},
		onPullDownRefresh() {
			uni.reLaunch({
				url: '/pages/video/video'
			})
		},
		onReachBottom() {
			console.log('到底了')
			if (this.videodata.length >= this.total) {
				uni.showToast({
					title: "已经到底啦😊😊～",
					position: "top",
					icon: "error",
					duration: 1000,
				})
			} else {
				this.isload = true
				setTimeout(() => {
					this.loadmore()
					this.isload = false
				}, 1500)
			}


		},
		onLoad() {},
		created() {
			this.n = 1;
			this.http(1);
		},
		onShow() {
			console.log('onshow', this.n)
			// this.http(1);
			uni.$emit('freshdanmu')

		},
		methods: {
			loadmore() {
				this.n++;
				console.log(this.n);
				this.http(this.n);
			},
			async http(page) {
				let res = await this.$zxl('/getvideo', {
					page: page
				})
				console.log(res.data, '获取视频video');
				if (res.data.status === 200) {
					this.loading = false;
					this.videodata = this.videodata.concat(res.data.data);
					this.total = res.data.total;
					setTimeout(() => {
						this.isLoading1 = true;
					}, 1000);
				} else {
					// this.videodata = []
				}
			},
			messageToggle(type, content) {
				this.msgType = type
				this.messageText = content
				this.$refs.message.open()
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
	.main {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		/* align-items:baseline; */
		/* justify-items: flex-start; */

	}

	.mainx {
		padding-bottom: 50rpx;

	}

	.loading {
		cursor: pointer;
		position: absolute;
		bottom: 2px;
		left: 40%;
		transform: translate(-50%);
		color: red;
	}

	.load2 {
		width: 750rpx;
		height: 100rpx;
		// background-color: red;
		position: relative;
		bottom: 10rpx;
		margin-top: 20rpx;
	}

	.loadson {}
</style>