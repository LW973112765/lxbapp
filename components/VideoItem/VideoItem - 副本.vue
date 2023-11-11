<template>
	<view class="main" >
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" >
			  <view class="sharemain">
			  	<view class="share" @click="shareweixin">
			  		<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c2b17470-50be-11eb-b680-7980c8a877b8.png" mode=""></image>
			  		<text>微信</text>
			  	</view>
			  	<view class="share" @click="shareqq">
			  		<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/e7a79520-50be-11eb-b997-9918a5dda011.png" mode=""></image>
			  		<text>QQ</text>
			  	</view>
			  </view>
			</uni-popup>
		</view>
		<view class="top" @click="toinfo(item.id)">
			<image :src="item.cover" mode=""></image>
			<view class="detail">
				<view class="left">
					<view class="zxl">
						<image src="../../static/images/fonts/bofangliang.png" mode=""></image>
					{{item.total}}
					</view>
					<view class="">
			
						<image src="../../static/images/fonts/danmu.png" mode=""></image>
					{{item.danmutotal}}
					</view>
				
				</view>
				<view class="right">
					{{item.duration}}
				</view>
			</view>
		</view>
		<view class="buttom">
			<view v-html="item.title">
			</view>
			<image @click="sharevideo" src="../../static/images/fonts/fx.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		props: {
		  item: Object,
		},
		name:"VideoItem",
		data() {
			return {
				timetotal:'',
				danmu:[]
			}
		
		},
	created() {
         
	},
	onLoad() {
		console.log('888')
	},
	mounted() {
		this.getdanmu(this.item.id)
		// uni.$on('freshdanmu',this.getdanmu)
		uni.$on('freshdanmu',()=>{
			console.log('刷新')
			this.getdanmu()
		})
	},
	
	methods:{
		shareweixin() {
						   console.log('分享')
		 		  uni.share({
		 		  	provider: "weixin",
		 		  	scene: "WXSceneSession",
		 		  	type: 4,
		 		  	href: this.item.video,
		 		  	title: "郎小宝视频分享",
		 		  	summary: "我在郎小宝发现一个好看的视频，分享给你看看！",
		 		  	imageUrl: this.item.cover,
					mediaUrl:this.item.video,
		 		  	success: function (res) {
		 		  		console.log("success:" + JSON.stringify(res));
		 		  	},
		 		  	fail: function (err) {
		 		  		console.log("fail:" + JSON.stringify(err));
		 		  	}
		 		  });
							   this.$refs.popup.close()
		 },
		 shareqq() {
						  console.log('分享')
		 		  uni.share({
		 		  	provider: "qq",
		 		  	scene: "WXSceneSession",
		 		  	href: this.item.video,
		 		  	title: "郎小宝视频分享",
		 		  	summary: "我在郎小宝发现一个好看的视频，分享给你看看！",
		 		  	imageUrl: this.item.cover,
		 		  	success: function (res) {
		 		  		console.log("success:" + JSON.stringify(res));
		 		  	},
		 		  	fail: function (err) {
		 		  		console.log("fail:" + JSON.stringify(err));
		 		  	}
		 		  });
							   this.$refs.popup.close()
		 },
		 sharevideo(){
		this.toggle('bottom')
		 },
		 toggle(type) {
		 	this.type = type
		 	this.$refs.popup.open(type)
		 },
		async getdanmu(zxl){
			let id = zxl || this.item.id
		 	  let res =	await this.$zxl('/getdanmu',{id})
		 	  this.danmu=res.data.data
			  // console.log('更新弹幕')
		 	},
   toinfo(id) {
	   uni.setStorageSync('danmu',JSON.stringify(this.danmu))
     uni.navigateTo({
		 animationType:'zoom-fade-out',
     	url:`/pages/VideoInfo/VideoInfo?id=${id}`
     })
   },
	}
	
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #FFFAE8;
	}
	.popup-content {
		z-index: 999999;
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 50px;
			background-color: #fff;
		}
	
		.popup-height {
	
			width: 200px;
		}
	
	.sharemain{
		z-index: 999999;
		width: 100%;
		height: 200rpx;
		background: -webkit-linear-gradient(top, pink, yellow);
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	    // margin-top: 30rpx;
		.share{
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
		    align-items: center;
			image{
				margin-top: 30rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}
	}
	
		.popup-success {
			color: #fff;
			background-color: #e1f3d8;
		}
	
		.popup-warn {
			color: #fff;
			background-color: #faecd8;
		}
	
		.popup-error {
			color: #fff;
			background-color: #fde2e2;
		}
	
		.popup-info {
			color: #fff;
			background-color: #f2f6fc;
		}
.main{
	width: 340rpx;
	height: 300rpx;
	margin-top: 20rpx;
	border-radius: 10rpx;
	overflow: hidden;
	margin-left: 17rpx;
	margin-right:17rpx;
	background-color: #FFFAE8;
}	
.top {
	position: relative;
	width: 100%;
	height: 200rpx;	
	image{
		width: 100%;
		height: 200rpx;
	}
}
	
.buttom{
	position: relative;
	width: 100%;
	padding: 10rpx 10rpx;
		background-color: white; 
		height: 100rpx;
 view{
	 width: 100%;
	    text-overflow: -o-ellipsis-lastline;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    line-clamp: 2;
	    -webkit-box-orient: vertical;
	 
 }
 image{
	 position: absolute;
	 width: 40rpx;
	height: 40rpx;
	top: 1rpx;
	right: 1rpx;
 }
}
.detail{
	width: 100%;
	height: 25px;
	position: absolute;
	bottom: 0;
	left: 0;
	image{
		height: 20px;
		width: 40rpx;
		vertical-align: middle;
	}
	 .left{
		 width: 200rpx;
		 display: flex;
		height: 30px;
		 float: left;
		 color: white;
		 font-size:15rpx;
		 .zxl{
			 margin-right: 10rpx;
		 }
	 }
	 .right{
		 min-width: 50rpx;
		color:white;
		 font-size:15rpx;
		 line-height: 30rpx;
		 padding-top: 10rpx;
		 padding-right: 10rpx;
		 height: 30px;
		 float: right;
	 }
}
</style>