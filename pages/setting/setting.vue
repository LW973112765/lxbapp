<template>
	<view class="main">
		<view class="box" @click="toinfo" v-if="userinfo.username">
			<view class="">
				<image class="icon" src="../../static/images/other/zh.png" mode=""></image>
				<text class="title">{{userinfo.username}}</text>
			</view>
			<image class="img" :src="user.avatar"> </image>
		</view>
		<view class="box" @click="toerweima" v-if="userinfo.id">
			<view class="">
				<image class="icon" src="../../static/codelogin/1.png" mode=""></image>
				<text class="title">My二维码</text>
			</view>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="totestdemo">
			<text class="title">测试项目websocket</text>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="totestupload">
			<text class="title">测试项目上传视频图片</text>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="changelogin">
			<view class="">
				<image class="icon" src="../../static/images/other/qh.png" mode=""></image>
				<text class="title">切换账号</text>
			</view>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="luobotugl" v-if="userinfo.id">
			<view class="">
				<image class="icon" src="../../static/images/other/lbtgl.png" mode=""></image>
				<text class="title">云端轮播图</text>
			</view>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="luobotusetting">
			<view class="">
				<image class="icon" src="../../static/images/other/lbt.png" mode=""></image>
				<text class="title">本地轮播置</text>
			</view>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="totest" v-if="0">
			<text class="title">折叠面板</text>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="toshuju">
			<view class="">
				<image class="icon" src="../../static/images/other/shuju.png" mode=""></image>
				<text class="title">应用数据</text>
			</view>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="tocommentaudit" v-if="userinfo.id">
			<view class="">
				<image class="icon" src="../../static/images/other/sh1.png" mode=""></image>
				<text class="title">审核评论</text>
			</view>
			<text class="more"> > </text>
		</view>
		<view class="box" @click="toaddword">
			<view class="">
				<image class="icon" src="../../static/images/tools/555.png" mode=""></image>
				<text class="title">上传句子</text>
			</view>
			<text class="more"> > </text>
		</view>
		<!-- <view class="box" @click="toupvideo">
			<image class="icon" src="../../static/images/other/sp.png" mode=""></image>
			<text class="title" >上传视频</text>
			<text class="more"> > </text>
		</view> -->
		<uni-collapse v-if="userinfo.type">
			<uni-collapse-item thumb="../../static/images/tools/2222.png" title="上传视频" :show-animation="true">
				<scroll-view scroll-x class="recentScroll" enable-flex>
					<view class="recentItem" @click="toupvideo">
						<image src="../../static/images/tools/1.png"></image>
						<text>手动上传</text>
					</view>
					<view class="recentItem" @click="toupvideo1">
						<image src="../../static/images/tools/lj1.png"></image>
						<text>链接上传</text>
					</view>
				</scroll-view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item thumb="../../static/images/tools/3333.png" title="上传相册" :show-animation="true">
				<scroll-view scroll-x class="recentScroll" enable-flex>
					<view class="recentItem" @click="todanup">
						<image src="../../static/images/tools/tp1.png"></image>
						<text>单张上传</text>
					</view>
					<view class="recentItem" @click="toduoup">
						<image src="../../static/images/tools/tp.png"></image>
						<text>多张上传</text>
					</view>
				</scroll-view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item thumb="../../static/images/tools/1111.png" title="工具箱" :show-animation="true">
				<scroll-view scroll-x class="recentScroll" enable-flex>
					<view class="recentItem" @click="tomusic">
						<image src="../../static/images/tools/yyy34.png"></image>
						<text>随机歌曲</text>
					</view>
					<view class="recentItem" @click="tofanyi">
						<image src="../../static/images/tools/fy2.png"></image>
						<text>翻译官</text>
					</view>
					<view class="recentItem" @click="totianqi">
						<image src="../../static/images/tools/tq2.png"></image>
						<text>天气查询</text>
					</view>
					<view class="recentItem" @click="totupian">
						<image src="../../static/images/tools/tp1.png"></image>
						<text>随机美图</text>
					</view>
					<view class="recentItem" @click="tojoke">
						<image src="../../static/images/tools/xh1.png"></image>
						<text>每日一笑</text>
					</view>
					<view class="recentItem" @click="tohistory">
						<image src="../../static/images/tools/ls1.png"></image>
						<text>历史上的今天</text>
					</view>

				</scroll-view>
			</uni-collapse-item>
		</uni-collapse>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				user: ''
			};
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onLoad() {
			this.user = JSON.parse(uni.getStorageSync('username'))
		},
		onShow() {
			this.user = JSON.parse(uni.getStorageSync('username'))
		},
		onBackPress() {
			uni.reLaunch({
				url: "/pages/personal/personal",
				animationType: 'zoom-fade-out'
			})
			return true
		},
		methods: {
			luobotusetting() {
				uni.navigateTo({
					url: '/pages/lunbotusetting/lunbotusetting',
					animationType: 'zoom-fade-out'
				})
			},
			luobotugl() {
				uni.navigateTo({
					url: '/pages/lunbotumanage/lunbotumanage',
					animationType: 'zoom-fade-out'
				})
			},
			totestupload() {
				uni.navigateTo({
					url: '/pages/testdemo/testupload/testupload',
					animationType: 'zoom-fade-out'
				})
			},
			totestdemo() {
				uni.navigateTo({
					url: "/pages/testdemo/testdemo",
					animationType: 'zoom-fade-out'
				})
			},
			toerweima() {
				uni.navigateTo({
					url: '/pages/erweima/erweima',
					animationType: 'zoom-fade-out'
				})
			},
			toaddword() {
				uni.navigateTo({
					url: "/pages/addword/addword",
					animationType: 'zoom-fade-out'
				})
			},
			toshuju() {
				uni.navigateTo({
					url: '/pages/appdata/appdata',
					animationType: 'zoom-fade-out'
				})
			},
			tocommentaudit() {
				uni.navigateTo({
					url: "/pages/commentaudit/commentaudit",
					animationType: 'zoom-fade-out'
				})
			},
			changelogin() {
				uni.navigateTo({
					url: '/pages/accountmanage/accountmanage',
					animationType: 'zoom-fade-out'
				})
			},
			tofanyi() {
				uni.navigateTo({
					url: "/pages/tools/fanyi/fanyi",
					animationType: 'zoom-fade-out'
				})
			},
			tojoke() {
				uni.navigateTo({
					url: "/pages/tools/joke/joke",
					animationType: 'zoom-fade-out'
				})
			},
			totianqi() {
				uni.navigateTo({
					url: "/pages/tools/tianqi/tianqi",
					animationType: 'zoom-fade-out'
				})
			},
			totupian() {
				uni.navigateTo({
					url: "/pages/tools/tupian/tupian",
					animationType: 'zoom-fade-out'
				})
			},
			tohistory() {
				uni.navigateTo({
					url: "/pages/tools/history/history",
					animationType: 'zoom-fade-out'
				})
			},
			tomusic() {
				uni.navigateTo({
					url: '/pages/tools/music/music',
					animationType: 'zoom-fade-out'
				})
			},
			totest() {
				uni.navigateTo({
					url: "/pages/test/test",
					animationType: 'zoom-fade-out'
				})
			},
			toupvideo() {
				uni.navigateTo({
					url: "/pages/upvideo/upvideo",
					animationType: 'zoom-fade-out'
				})
			},
			toupvideo1() {
				uni.navigateTo({
					url: "/pages/upvideo/upvideoother/upvideoother",
					animationType: 'zoom-fade-out'
				})
			},
			toinfo() {
				uni.navigateTo({
					url: "/pages/personinfo/personinfo",
					animationType: 'zoom-fade-out'
				})
			},
			todanup() {
				uni.navigateTo({
					url: "/pages/uploadphoto/updan/updan",
					animationType: 'zoom-fade-out'
				})
			},
			toduoup() {
				uni.navigateTo({
					url: "/pages/uploadphoto/upduo/upduo",
					animationType: 'zoom-fade-out'
				})
			},

		}
	}
</script>
<style>
	page {
		background: url("../../static/images/bg/4.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;

	}
</style>
<style lang="scss" scoped>
	/deep/ .uni-collapse-item__title-text,
	.uni-collapse-item,
	{
	background-color: whitesmoke;
	// margin-top: 30rpx;
	width: 100%;
	}

	/deep/ .uni-collapse-item__title-text {
		background-color: whitesmoke;
		// padding-top: 10rpx;
		line-height: 100rpx;
		height: 100rpx;
		font-size: 35rpx;
		color: #999;
		width: 100%;
		box-sizing: border-box;
	}

	/deep/ .uni-collapse-item__title-wrap {
		height: 100rpx;
	}

	/deep/ .uni-collapse {
		margin-top: 30rpx;
	}

	/deep/ .uni-collapse-item__title-box {
		margin: 0 auto;
		width: 700rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.main {
		width: 100%;
		height: auto;
		padding-top: 30rpx;

		.box {
			margin: 0 auto;
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;
			margin-bottom: 30rpx;
			background-color: whitesmoke;
			padding: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			border-bottom: 1px solid #ebeef5;
			align-items: center;
			font-size: 35rpx;
			color: #999;

			view {
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					margin-left: 38rpx;
				}
			}

			.icon {
				width: 50rpx;
				height: 50rpx;
			}

			.title {
				height: 100rpx;
				line-height: 100rpx;
			}

			.more {
				height: 100rpx;
				line-height: 100rpx;
			}
		}
	}

	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 15px;
	}

	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}

	.button {
		// margin-top: 10px;
		margin: 10px;
		margin-bottom: 0;
	}

	.recentScroll {
		display: flex;
		height: 250rpx;
		white-space: nowrap;
	}

	.recentItem {
		margin-right: 20rpx;
		margin-left: 20rpx;
		display: inline-block;
	}

	.recentItem text {
		font-size: 27rpx;
		color: #999;
		display: block;
		width: 200rpx;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.recentItem image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}

	.img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
</style>