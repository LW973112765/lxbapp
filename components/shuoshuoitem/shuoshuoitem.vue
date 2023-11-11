<template>
	<view>
		<view class="main" @click="toinfo(item.id)" @longpress="del(item.id,item.content)">
			<!-- 发布者信息 -->
			<view class="top">
				<view style="display: flex; align-items: center;">
					<image class="publisher-avatar" src="http://lwandzxl.top/1687512911496.jpg"></image>
					<text style="color: #333;font-size: 30rpx;margin-left: 15rpx;">{{item.author}}</text>
				</view>
				<view style="color: #999;font-size: 30rpx;" class="font-base color-grey">{{item.time}}</view>
			</view>
			<!-- 正文简要 -->
			<view style="display: flex; align-items: center;">
				<view class="content" v-if="imglist.length>0">
					<view class="zxl">{{item.content}}</view>
				</view>
				<view class="content-only-view" v-if="imglist.length==0">
					<view class="lw">{{item.content}}</view>
				</view>
				<image mode="aspectFit" class="content-thumbnail" v-if="imglist.length>0" :src="imglist[0]"></image>
			</view>
			<!-- 其他信息 -->
			<view class="d-flex align-items-center justify-content-between" v-show="item.position">
				<view class="weizhi">
					{{item.position}}
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		name: "shuoshuoitem",
		props: {
			item: Object,
		},
		data() {
			return {
				imglist: [],
			};
		},

		methods: {
			toinfo(id) {
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/qinglvkongjian/shuoshuoinfo/shuoshuoinfo?id=${id}`
				})
			},
			del(id, content) {
				uni.$emit("delitem", id, content)
			},
		},
		created() {
			if (this.item.url) {
				this.imglist = this.item.url.split(',')
				console.log(this.imglist)
			}

		},
	}
</script>

<style lang="less" scoped>
	.main {
		width: 680rpx;
		margin: 0 auto;
		background-color: white;
		border-radius: 10rpx;
		margin-bottom: 20rpx;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
		}
	}

	.publisher-avatar {
		border-radius: 5rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.content-thumbnail {
		width: 300rpx;
		height: 300rpx;
	}

	.content {
		width: 520rpx;
		text-align: justify;
		height: 180rpx;
		overflow: hidden;
		word-break: break-all;
		word-wrap: break-word;
		padding: 20rpx;

		// background-color: red;
		.zxl {
			// background-color: aqua;
			width: 500rpx;
			margin: 0 auto;
			color: #333;
			text-overflow: -o-ellipsis-lastline;
			//整体超出部分隐藏
			overflow: hidden;
			//文本超出部分以...形式展示，同第一行样式代码
			text-overflow: ellipsis;

			display: -webkit-box;
			-webkit-line-clamp: 4;
			line-clamp: 4;
			-webkit-box-orient: vertical;
		}

		// text-overflow: -o-ellipsis-lastline;
		// //整体超出部分隐藏
		// overflow: hidden;
		// //文本超出部分以...形式展示，同第一行样式代码
		// text-overflow: ellipsis;

		// display: -webkit-box;
		// -webkit-line-clamp:4;
		// line-clamp: 4;
		// -webkit-box-orient: vertical;
	}

	.content-only-view {
		// background-color: red;
		width: 100%;
		text-align: justify;
		height: auto;
		overflow: hidden;
		word-break: break-all;
		word-wrap: break-word;
		padding: 20rpx;

		.lw {

			// background-color: aqua;
			width: 90%;
			margin: 0 auto;
			text-overflow: -o-ellipsis-lastline;
			//整体超出部分隐藏
			overflow: hidden;
			//文本超出部分以...形式展示，同第一行样式代码
			text-overflow: ellipsis;
			color: #333;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			line-clamp: 4;
			-webkit-box-orient: vertical;
		}

		// text-overflow: -o-ellipsis-lastline;
		// //整体超出部分隐藏
		// overflow: hidden;
		// //文本超出部分以...形式展示，同第一行样式代码
		// text-overflow: ellipsis;

		// display: -webkit-box;
		// -webkit-line-clamp:4;
		// line-clamp: 4;
		// -webkit-box-orient: vertical;
	}

	.publisher-location {
		color: var(--nest-PRIMARY);
	}

	.top-image {
		position: absolute;
		top: 0;
		width: 100%;
		height: 700rpx;
		z-index: -10;
		border-radius: 0 0 30rpx 30rpx;
	}

	.top-image-bg1 {
		height: 50rpx;
		width: auto;
	}

	.top-body {
		height: 300rpx;
		margin-top: 100rpx;
	}

	.lovers-avatar {
		width: 100rpx;
		height: 100rpx;
		box-shadow: 0 0 10px #FEB5B6;
		border: solid #ffffff 2px;
	}

	.weizhi {
		width: 90%;
		color: lightblue;
		font-size: 25rpx;
		padding: 20rpx;
		height: 30rpx;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>