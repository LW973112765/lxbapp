<template>
	<view class="main">
		<scroll-view scroll-y class="recentScroll" enable-flex v-if="jilu.length>0">
			<view class="recentItem" v-for="(item,id) in jilu" :key="item.id" @click="goarticleinfo(item.id,item.type)">
				<view class="left">
					<image class="image" :src="item.cover" v-if="item.cover" alt="888"></image>
					<image class="image" src="../../static/images/bg/18.jpg" v-else></image>
					<image class="tag" v-if="item.type=='video'" src="../../static/images/fonts/sp3.png" mode="">
					</image>
					<image class="tag" v-if="item.type=='article'" src="../../static/images/fonts/wz.png" mode="">
					</image>
					<text
						v-if="item.type=='video' && item.istimeover==false">{{item.videocurrenttime}}/{{item.duration}}</text>
					<!-- <text v-if="item.type=='video'">{{computetime(item.videocurrenttime,item.duration)}}</text> -->
					<text v-if="item.type=='video'&& item.istimeover==true">已看完</text>
				</view>
				<view class="right">
					<text>{{item.title}}</text>
					<text>{{item.time}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="nodata" v-else>
			<view class="">
				<image src="../../static/images/personal/nodata.png" mode=""></image>
			</view>
			<view>暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jilu: ''
			};
		},
		onNavigationBarButtonTap(e) {
			uni.removeStorageSync('liulanjilu')
			this.getliulanjilu()
		},
		created() {
			this.getliulanjilu()
		},
		onShow() {
			this.getliulanjilu()
		},
		methods: {
			computetime(a, b) {
				return '郎小宝'
			},
			goarticleinfo(id, type) {
				if (type == 'article') {
					uni.navigateTo({
						animationType: 'zoom-fade-out',
						url: `/pages/ArticleInfo/ArticleInfo?id=${id}`
					})
				} else {
					uni.navigateTo({
						animationType: 'zoom-fade-out',
						url: `/pages/VideoInfo/VideoInfo?id=${id}`
					})
				}
			},

			getliulanjilu() {
				let liulan = uni.getStorageSync("liulanjilu");
				if (liulan) {
					liulan = JSON.parse(liulan);
				} else {
					liulan = []
				}
				this.jilu = liulan
			},

		},
	}
</script>
<style lang="scss" scoped>
	.main {
		width: 100%;
		height: 100%;
	}

	.recentScroll {
		display: flex;
		padding-top: 20rpx;
		width: 100%;
	}

	.recentItem {
		margin-left: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		height: 200rpx;

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 20rpx 20rpx;
		}

		.left {
			position: relative;
			width: 300rpx;
			height: 200rpx;

			.image {
				width: 300rpx;
				height: 200rpx;
			}

			.tag {
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				top: 5rpx;
				right: 5rpx;
			}

			text {
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				padding: 10rpx;
				border-radius: 5rpx;
				font-size: 20rpx;
				// background: -webkit-linear-gradient(top, pink, #999999);
				background: -webkit-linear-gradient(top, pink, aqua);
				opacity: 0.4;
				color: black
			}
		}
	}

	.recentItem .right text {
		font-size: 27rpx;
		color: #999;
		display: block;
		width: 350rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.recentItem image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
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
</style>