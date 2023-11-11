<template>
	<view>
		<view class="header">
			郎小宝の机器人使用帮助：
		</view>
		<view class="item">
			<h3>一、聊天模式</h3>
			<view class="">
				聊天模式分为：<text>闲聊模式</text>、<text>翻译模式</text>
			</view>
		</view>
		<view class="item">
			<h3>二、聊天功能</h3>
			<view class="">
				聊天功能包含：<text>获取随机图片</text>、<text>获取随机视频</text>
				、<text>获取随机句子</text>、<text>获取随机音乐</text>、<text>获取当前城市天气</text>、
				<text>讲笑话</text>
				、<text>翻译文档</text>、<text>与机器人瞎聊等</text>
			</view>
			<view class="">
				(注意：翻译模式下只能处理翻译请求，同样的闲聊模式下不能进行翻译)
			</view>
		</view>
		<view class="item">
			<h3>三、聊天命令</h3>
			<view class="">
				(蓝色数字代表该命令的快捷操作)
			</view>
			<view class="">
				1.切换模式为闲聊：<text>切换为闲聊</text><text style="color: limegreen;">(1)</text>
			</view>
			<view class="">
				2.切换模式为翻译：<text>切换为翻译。</text><text style="color: limegreen;">(2)</text>
			</view>
			<view class="">
				3.获取随机图片：<text>图片、照片</text><text style="color: limegreen;">(3)</text>
			</view>
			<view class="">
				4.获取随机视频：<text>视频</text><text style="color: limegreen;">(4)</text>
			</view>
			<view class="">
				5.获取随机音乐：<text>音乐</text><text style="color: limegreen;">(5)</text>
			</view>
			<view class="">
				6.暂停音乐：<text>暂停音乐</text><text style="color: limegreen;">(6)</text>
			</view>
			<view class="">
				7.播放音乐：<text>暂停音乐</text><text style="color: limegreen;">(7)</text>
			</view>
			<view class="">
				8.讲笑话：<text>笑话</text><text style="color: limegreen;">(8)</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 750rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 50rpx;
	}

	.item {
		padding: 0 20rpx;
		margin-top: 20rpx;
	}

	text {
		color: red;
		font-style: initial;
	}
</style>