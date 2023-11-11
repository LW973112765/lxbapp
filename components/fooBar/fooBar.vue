<template>
	<view class="bottom">
		<view @click="toIndex(0)" class="navTab">
			<image src="../../static/tabbar/home_art.png" class="icon"></image>
			<text>首页</text>
		</view>
		<!-- <view class="navTab">
			<image src="../../static/tabbar/home.png" class="icon"></image>
			<text>报表</text>
		</view> -->
		<view class="addBox">
			<view @click="toIndex(2)" class="footBtn">
				<image src="../../static/tabbar/tougao_art.png" class="addIcon"></image>
			</view>
			<text style="margin-top: 35rpx;">记一笔</text>
		</view>
		<!-- <view class="navTab">
			<image src="../../static/tabbar/user_art.png" class="icon"></image>
			<text>圈子</text>
		</view> -->
		<view @click="toIndex(1)" class="navTab">
			<image src="../../static/tabbar/user_art.png" class="icon"></image>
			<text>我的</text>
		</view>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				
			}
		},
		props: ['home'],
		methods: {
			toIndex(index) {
				this.music.zxl_click()
				this.$emit('toIndex', index)
				
				// if (index == 0) {
				// 	console.log(index)
				// 	uni.switchTab({
				// 		url:"/pages/suixinji/accounts/home/home"
				// 	})
				// } else if (index == 1) {
				// 	console.log(index)
				// 	uni.switchTab({
				// 		url:"/pages/suixinji/accounts/my/my"
				// 	})
				// } else if (index == 2) {
				// 	console.log(index)
				// 	uni.navigateTo({
				// 		url: "/pages/suixinji/accounts/addAcc/addAcc"
				// 	})
				// }
			}
		}
	}
</script>

<style scoped lang="scss">
.bottom {
	border-top:1px solid #242a2f;
	padding:8px 0;
	background:#242a2f;
	position:fixed;
	bottom:0;
	width:100%;
	height:90rpx;
	z-index:999999;
	display: flex;
}

.icon{
	width: 40rpx;
	height: 40rpx;
}

.addIcon{
	width: 50rpx;
	height: 50rpx;
}

.navTab{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 24rpx;
	color:#FFFFFF
}

.addBox{
	width: 240rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 24rpx;
	color:#FFFFFF
}

.footBtn{
	position: absolute;
	top: -70rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 90rpx;
	height: 90rpx;
	border: 18rpx #1c2025 solid;
	background-color: #FFFFFF;
	border-radius: 100px;
	box-shadow: 0 -2rpx 2rpx #1c2025;
}

</style>