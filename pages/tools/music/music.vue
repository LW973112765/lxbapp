<template>
  <view class="main">
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
	  <uni-popup ref="message" type="message" animation>
	  	<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
	  </uni-popup>
	  <view class="cover">
	  	 <view class="discContainer">
	  	 	<image class="disc" src="/static/images/song/disc.png"></image>
	  	 	<image  class="musicImg" :src="song.picurl"></image>		
	  	 </view>
	  	  <image  class="music" :src="song.picurl"></image>
	  </view>
	
    <view class="top">
		<uni-section title="本地数据" type="line">
		      <uni-data-select
		        v-model="value"
		        :localdata="options"
		      ></uni-data-select>
		    </uni-section>
     <button class="btn" type="primary" round @click="getmusic">获取歌曲</button>
	 <view class="text" >{{song.url}}</view>
    </view>
   <!-- <view class="content"><image :src="img" /></view> -->
  <!-- <view class="audio">
  	<audio  :src="song.url" :poster="song.picurl" :name="song.name" :author="song.artistsname" controls></audio>
  </view> -->

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
  </view>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
		img: require("../../../static/images/bg/registerbg.jpg"),
		type: 'center',
		msgType: 'success',
		messageText: '这是一条成功提示',
		song:'',
       options: [
		{
		  value: "热歌榜",
		  text: "热歌榜",
		},
		{
		  value:"新歌榜",
		  text: "新歌榜",
		},
		{
		  value: "飙升榜",
		  text: "飙升榜",
		},
		{
		  value: "抖音榜",
		  text: "抖音榜",
		},
		{
		  value: "电音榜",
		  text: "电音榜",
		}
      ],
      value: "",
	  url:''
    };
  },
  onLoad() {
  	this.value="热歌榜"
	this.getmusic()
	this.innerAudioContext = uni.createInnerAudioContext();
	this.innerAudioContext.onError(()=>{
		this.messageToggle('warn','出错啦,自动切换下一首！')
		this.getmusic()
	});
	this.innerAudioContext.onEnded(()=>{
	this.getmusic()
	})
	
  },
  methods: {
	  audio(e){
	  				let _this = this
	  				if(_this.music == e){
	  					if(_this.innerAudioContext.paused){
	  						_this.innerAudioContext.play()
	  					}else{
	  						_this.innerAudioContext.pause()
	  						_this.innerAudioContext.onPause(()=>{
	  							_this.innerAudioContext.startTime = _this.innerAudioContext.currentTime
	  						})
	  				}
	  
	  				}else{
	  					_this.innerAudioContext.src = e
	  					if(_this.innerAudioContext.paused){
	  							_this.innerAudioContext.play()
	  						}else{
	  							_this.innerAudioContext.pause()
	  							_this.innerAudioContext.onPause(()=>{
	  								_this.innerAudioContext.startTime = _this.innerAudioContext.currentTime
	  							})
	  					}
	  						
	  				}
	  				_this.music =e 
	  			},
				shareweixin() {
					
						console.log('分享')
				 		  uni.share({
				 		  	provider: "weixin",
				 		  	scene: "WXSceneSession",
				 		  	type: 3,
				 		  	href: this.song.url,
				 		  	title: "郎小宝音乐分享",
				 		  	summary: "我在郎小宝发现一首好听的音乐，分享给你听听！",
				 		  	imageUrl: this.song.picurl,
										mediaUrl:this.song.url,
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
				 		  	type: 3,
				 		  	href: this.song.url,
				 		  	title: "郎小宝音乐分享",
				 		  	summary: "我在郎小宝发现一首好听的音乐，分享给你听听！",
				 		  	imageUrl: this.song.picurl,
							mediaUrl:this.song.url,
				 		  	success: function (res) {
				 		  		console.log("success:" + JSON.stringify(res));
				 		  	},
				 		  	fail: function (err) {
				 		  		console.log("fail:" + JSON.stringify(err));
				 		  	}
				 		  });
						  this.$refs.popup.close()
				 },
				 onNavigationBarButtonTap(e){
				this.toggle('bottom')
				 },
				 toggle(type) {
				 	this.type = type
				 	this.$refs.popup.open(type)
				 },
	  messageToggle(type,content) {
	  	this.msgType = type
	  	this.messageText = content
	  	this.$refs.message.open()
	  },
    async  getmusic() {
	console.log(this.value)
   if(this.value==''){
   		this.messageToggle('warn','请选择一个类型哦😊！')
   		}
		else{
          let res =await this.$lw('https://api.uomg.com/api/rand.music',{sort:this.value,format:"json"})
		   console.log(res.data)
		   this.song=res.data.data
		   this.url=res.data.data.url
		   this.audio(this.song.url)
		   uni.setNavigationBarTitle({
		         title: this.song.name+'~~'+this.song.artistsname

		       })
		}
    },
  },
};
</script>
<style>
	page{
		background: -webkit-linear-gradient(top, pink, #999999);
	}
</style>
<style lang="less" scoped>
	page{
		width: 100%;
		height: 100%;
	}
	audio{
		width: 100%;
		height: 100rpx;
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
	.uni-popup{
		z-index: 999999;
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
	
		// .text {
		// 	font-size: 12px;
		// 	color: #333;
		// }
	
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
.cover{
		position: relative;
		background: url('../../../static/images/personal/12.jpg') no-repeat;
		background-size: cover;
		width: 100%;
		height: 300rpx;
		.music{
		  position: absolute;
		  top: 50%;
		  left: 50%;
		  transform: translate(-50%,-50%);
			width: 250rpx;
			height: 250rpx;
			border-radius: 20rpx;
			
		}
		
		
	}
	.musicImg {
	  position: absolute;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  margin: auto;
	  width: 150rpx;
	  height: 150rpx;
	  border-radius: 50%;
	
	}
	
.article {
  width: 100%;
  height: auto;
   background: -webkit-linear-gradient(top, pink, #999999);
}
/* 磁盘 */
.discContainer {
  position: relative;
   top: 10%;
left: 55%;

  width: 240rpx;
  height: 240rpx;
  animation: disc 6s linear infinite;

   .disc{
   	  position: absolute;
   	  // top: 50%;
   	  // left: 70%;
   	  // transform: translate(-50%,-50%);
   	width: 240rpx;
   	height: 240rpx;
   }
}
@keyframes disc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.main {
  padding-top: 30rpx;
  width: 100%;
  height: auto;
  padding-bottom: 60rpx;
  //   margin-top: 20rpx;
  margin-right: 30rpx;
  background: radial-gradient(aqua, white);
}
.audio{
	position: relative;
	margin: 0 auto;
	height: 100rpx;
	width: 80%;
	// background-color: red;
	audio{
		height: 100rpx;
	}
}
.top,
.content,
.type{
  position: relative;
  margin: 0 auto;
  width: 80%;
}
/deep/ .uni-select {
background-color: whitesmoke;
margin-top: 30rpx;
width: 100%;
}
.text{
	width: 100%;
	overflow-wrap: break-word;
}
.content{
	
	margin-top: 30rpx;
}

image {
  width: 100%;
  height: 300rpx;
}
.btn{
	margin-top: 30rpx;
	margin-bottom: 30rpx;
}
</style>