<template>
	<view class="main">
		
		<view class="box" @click="toup">
			<image class="icon" src="../../../static/images/chat/bg.png" mode=""></image>
			<text class="title">设置背景图片</text>
			<text class="more"> > </text>
		</view>

	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				myid:null,
				friendid:null
			};
		},
		computed: {
		  ...mapState("loginModule", ["userinfo"]),
		},
		onLoad(e) {
			console.log(e,'聊天设置')
			this.myid=e.myid
			this.friendid=e.friendid
		},
		
		
		methods:{
		
			toup(){
				uni.navigateTo({
					url:`/pages/chat/uploadbg/uploadbg?myid=${this.myid}&friendid=${this.friendid}`,
					animationType:'zoom-fade-out'
				})
			},
		
		
		}
	}
</script>
<style lang="scss" scoped>
	/deep/ .uni-collapse-item__title-text,.uni-collapse-item, {
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
	color:#999;
	width: 100%;
	box-sizing: border-box;
	}
	/deep/ .uni-collapse-item__title-wrap{
		height: 100rpx;
	}
	/deep/ .uni-collapse{
		margin-top: 30rpx;
	}
	/deep/ .uni-collapse-item__title-box{
		margin: 0 auto;
		width: 700rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		box-sizing: border-box;
	}
.main{
	width: 100%;
	height: auto;
	padding-top: 30rpx;
	.box{
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
		color:#999;
		.icon{
			width: 50rpx;
			height: 50rpx;
			margin-right: -450rpx;
		}
		.title{
			height: 100rpx;
			line-height: 100rpx;
		}
		.more{
			height: 100rpx;
			line-height: 100rpx;
		}
	}
}

</style>
