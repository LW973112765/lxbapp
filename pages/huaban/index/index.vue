<template>
	<view>
		<view class="main">
			<view class="box">
				<image @click="towhite" src="../../../static/png/logo.png" mode=""></image>
				<text>白色画板</text>
			</view>
			<view class="box">
				<image @click="toblack" src="../../../static/png/black.png" mode=""></image>
				<text>黑色画板</text>
			</view>
			<view class="box">
				<image @click="totuya" src="../../../static/png/black.png" mode=""></image>
				<text>简易涂鸦</text>
			</view>
			<view class="box">
				<image @click="tohelp" src="../../../static/png/help.png" mode=""></image>
				<text>画板使用</text>
			</view>
			<view class="box">
				<image @click="tofanye" src="../../../static/png/juzi.jpg" mode=""></image>
				<text>精美句子</text>
			</view>
			<view class="box">
				<image @click="tofangkuai" src="../../../static/png/els.jpg" mode=""></image>
				<text>俄罗斯方块</text>
			</view>
			<view class="box">
				<image @click="toshuangrenwuziqi" src="../../../static/png/wuziqi.jpg" mode=""></image>
				<text>双人五子棋</text>
			</view>
			<view class="box">
				<image @click="toerlingsiba" src="../../../static/png/2048.jpg" mode=""></image>
				<text>2048游戏</text>
			</view>
			<view class="box">
				<image @click="todoushouqi" src="../../../static/png/doushouqi.jpg" mode=""></image>
				<text>斗兽棋</text>
			</view>
			<view class="box">
				<image @click="toxiaoxiaole" src="../../../static/png/xiaoxiaole.jpg" mode=""></image>
				<text>消消乐</text>
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
		methods:{
			toerlingsiba(){
				uni.navigateTo({
					url:"/pages/huaban/2048/2048",
					animationType:'zoom-fade-out'
				})
			},
			toshuangrenwuziqi(){
				uni.navigateTo({
					url:"/pages/huaban/shuangrenwuziqi/shuangrenwuziqi",
				animationType:'zoom-fade-out'
				})
			},
			tofangkuai(){
				uni.navigateTo({
					url:"/pages/eluosifangkuai/eluosifangkuai",
				animationType:'zoom-fade-out'
				})
			},
			towhite(){
				uni.navigateTo({
					url:"/pages/huaban/whiteboard/whiteboard",
				animationType:'zoom-fade-out'
				})
			},
			toblack(){
				uni.navigateTo({
					url:"/pages/huaban/blackboard/blackboard",
				animationType:'zoom-fade-out'
				})
			},
			tohelp(){
				uni.navigateTo({
					url:"/pages/huaban/help/help",
				animationType:'zoom-fade-out'
				})
			},
			totuya(){
				uni.navigateTo({
					url:"/pages/yuya/yuya",
				animationType:'zoom-fade-out'
				})
			},
			tofanye(){
				uni.navigateTo({
					url:'/pages/fanye/fanye',
				animationType:'zoom-fade-out'
				})
			},
			todoushouqi(){
				uni.navigateTo({
				url:'/pages/huaban/doushouqi/doushouqi',
				animationType:'zoom-fade-out'
				})
			},
			toxiaoxiaole(){
				uni.navigateTo({
				url:'/pages/huaban/xiaoxiaole/xiaoxiaole',
				animationType:'zoom-fade-out'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.main{
	width: 750rpx;
	height: 200rpx;
	// background-color: red;
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
	
	.box{
		width: 180rpx;
		height: 180rpx;
		// background-color: red;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		image{
			width: 100rpx;
			height: 100rpx;
		}
	}
	image{
		border-radius: 5rpx;
	}
}
</style>
