<template>
	<view @click="back" @longpress="isPop = true">
		<view class="top">
			<text>{{currentImg*1+1}}</text>/
			<text>{{imgs.length}}</text>
		</view>
		<swiper class="swiper-img" :current="currentImg" :duration="300" @change="changeSwiper">
			<swiper-item class="swiper-item" v-for="(item, index) in imgs" :key="index">
				<view class="img-page">
					<movable-area scale-area>
						<movable-view direction="all" scale="true" scale-min="1" scale-max="4">
							<image :src="item.url" mode="widthFix" :lazy-load="true" />
						</movable-view>
					</movable-area>
				</view>
			</swiper-item>
		</swiper>
		<view class="item-bottom">
			<view class="small-list-page">
				<view class="small-list" v-if="imgs.length > 1">
					<view class="img-page" :class="currentImg == index ? 'img-page-checked' : ''"
						v-for="(item, index) in imgs" :key="index" @click.stop="toImg(index)">
						<image class="img" border-radius="10rpx" :src="item.url" mode="aspectFill" />
					</view>
				</view>
			</view>
		</view>
		<view class="pop" v-if="isPop">
			<view class="item" @click.stop="share()">分享到QQ</view>
			<view class="item" @click.stop="shareweixin()">分享到微信</view>
			<!-- #ifndef H5 -->
			<view class="item" @click.stop="saveImg(false)">保存图片</view>
			<view class="item" @click.stop="saveImg(true)">保存全部图片</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: [],
				currentImg: 0,
				isPop: false
			};
		},
		onLoad(options) {
			let {
				imgs,
				current
			} = options;
			this.imgs = JSON.parse(imgs);
			this.currentImg = current;
			uni.setNavigationBarTitle({
				title: this.imgs[this.currentImg].time
			})
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.imgs[this.currentImg].time
			})
		},
		methods: {
			changeSwiper(e) {
				this.currentImg = e.detail.current;
				// console.log('当前主题',this.imgs[this.currentImg].title)
				uni.setNavigationBarTitle({
					title: this.imgs[this.currentImg].time
				})
			},
			toImg(index) {
				this.currentImg = index;
			},
			back() {
				if (this.isPop) {
					this.isPop = false
					return
				}
				try {
					this.$Router.back(1);
				} catch (e) {
					//TODO handle the exception
					uni.navigateBack();
				}
			},
			shareweixin() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: this.imgs[this.currentImg].url,
					title: "郎小宝图片分享",
					summary: "我在郎小宝发现一张好看的图片，分享给你看看！",
					imageUrl: this.imgs[this.currentImg].url,
					success: () => {
						this.isPop = false
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			share() {
				uni.share({
					provider: "qq",
					scene: "WXSceneSession",
					type: 0,
					href: this.imgs[this.currentImg].url,
					title: "郎小宝图片分享",
					summary: "我在郎小宝发现一张好看的图片，分享给你看看！",
					imageUrl: this.imgs[this.currentImg].url,
					success: () => {
						this.isPop = false
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			saveImg(isAll = false) {
				const that = this;
				if (!isAll) {
					uni.downloadFile({ //下载
						url: this.imgs[this.currentImg].url, //图片下载地址网络地址
						success: res => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({ //保存图片到系统相册。
									filePath: res.tempFilePath, //图片文件路径
									success: function() {
										uni.showToast({
											title: '图片保存成功'
										});
										that.isPop = false
									},
									fail: function(e) {
										console.log(e);
										uni.showToast({
											title: '图片保存失败',
											icon: 'none',
										});
									}
								});
							}
						}
					});
					return;
				}
				this.imgs.forEach(item => {
					uni.downloadFile({
						url: item.url,
						success: res => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.showToast({
											icon: "none",
											title: "保存全部成功"
										})
										that.isPop = false
									},
									fail: function() {}
								});
							} else {}
						}
					});
				})

			}
		},
	};
</script>

<style lang="scss" scoped>
	.top {
		width: 100vw;
		position: fixed;
		z-index: 9999;
		top: 100rpx;
		text-align: center;
		color: red;
		font-weight: 600;
	}

	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	movable-area {
		height: 100%;
		width: 100%;
		position: fixed;
		overflow: hidden;
	}

	movable-view image {
		width: 100%;
	}

	uni-image>img {
		z-index: -1 !important;
	}

	.content {
		height: 60vh;
	}

	.swiper-img {
		width: 100vw;
		height: 100vh;
		background-color: #000000;

		&>.swiper-item {
			width: 100vw;
			height: 100vh;

			.img-page {
				height: 100vh;
				display: flex;
				align-items: center;
			}
		}
	}

	.item-bottom {
		width: 100vw;
		position: fixed;
		z-index: 9999;
		bottom: 0;
		left: 0rpx;
		padding: 30rpx;
		transition: ease-in-out 0.3s;
		height: 200rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.small-list-page {
		min-height: 60rpx;
	}

	.small-list {
		display: flex;
		justify-content: center;
		align-items: center;

		.img-page {
			display: inline-block;
			margin-right: 20rpx;
			border: 2rpx solid #c2c2c2;
			transition: ease-in 0.1s;
			border-radius: 11rpx;
			background: #c2c2c2;
			overflow: hidden;

			&:last-child {
				margin-right: 0;
			}

			.img {
				width: 46rpx;
				height: 46rpx;
				display: block;
			}
		}

		.img-page-checked {
			transform: scale(1.2);
			border: 4rpx solid #c2c2c2;
		}
	}

	.pop {
		width: 500rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999999;

		.item {
			line-height: 100rpx;
			height: 100rpx;
			padding: 0 50rpx;
			transition: all .2s;
			border-radius: 20rpx;

			&:active {
				background-color: #eeeeee;
			}
		}
	}
</style>