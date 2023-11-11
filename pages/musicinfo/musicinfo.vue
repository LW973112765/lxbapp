<template>
	<view class="songDetailContainer">
	  <view class="author">{{song.title}}~{{song.artist}}</view>
	  <!-- 显示图片 -->
	  <view v-if="!isshowlrc" class="circle"></view>
	  <image v-if="!isshowlrc" class="needle" :class="isPlay ? 'needleRotate':''" src="/static/images/song/needle.png"></image>
	
	  <view v-if="!isshowlrc" class="discContainer"  :class="isPlay ? 'discAnimation':'animationpaused'">
	    <image class="disc" src="/static/images/song/disc.png"></image>
	    <image @click="showlrc" class="musicImg" :src="song.pic"></image>
	  </view>
	 <!-- 显示歌词 -->
	 <scroll-view v-if="isshowlrc" @click="showlrc" class="lrc" 	
	 scroll-y 
	 enable-flex
	:scroll-top="top"
	 >
	   <!-- wx:for-index="in" 当前遍历时的下标 -->
	  <view  v-for="(item,index) in songlrc" :class="index==songindex?'lrcstyle':''">{{item[1]}}</view>
	 </scroll-view>
	  <!-- 进度条控制区域 -->
	  <view class="progressControl">
	    <text>{{currentTime}}</text>
	    <!-- 总进度条 -->
	    <view class="barControl" 
	    @click="handclick"
	    @touchstart="handleTouchStart"
	      @touchmove="handleTouchMove"
	      @touchend="handleTouchEnd">
	      <!-- 实时进度条 -->
	      <view class="audio-currentTime-Bar" :style="{width: `${currentWidth}` + 'rpx'}">
	        <!-- 小圆球 -->
	        <view class="audio-circle"></view>
	      </view>
	    </view>
	    <text>{{durationTime}}</text>
	  </view>
	  <!-- 底部控制播放区域 -->
	  <view class="musicControl">
	   
	    <image @click="changestyle" v-if="songstyle==1" src="../../static/images/song/shunxu.png"></image>
	    <image @click="changestyle" v-if="songstyle==2" src="../../static/images/song/suiji.png"></image>
	    <image @click="changestyle" v-if="songstyle==3" src="../../static/images/song/danqu.png"></image>
	
	
	    <image src="../../static/images/song/shang.png" id="pre" @click="handleSwitch"></image>
	
	    <image class="big" v-if="isPlay" src="../../static/images/song/zanting.png" @click="handleMusicPlay"></image>
	    <image class="big" v-else src="../../static/images/song/start.png" @click="handleMusicPlay"></image>
	
	    <image src="../../static/images/song/xia.png" id="next" @click="handleSwitch"></image>
	
	    <image src="../../static/images/song/list.png"></image>
	  </view>
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
	 let backgroundAudioManager = uni.getBackgroundAudioManager();
	import PubSub from 'pubsub-js';
	import {parseLrc} from '../../utils/lyricsformat.js'
	import moment from 'moment'
	let startX = 0; // 手指起始的坐标
	let moveX = 0; // 手指移动的坐标
	let moveDistance = 0; // 手指移动的距离
	export default {
		data() {
			return {
				isPlay:false, // 音乐是否播放
				    song: {}, // 歌曲详情对象
				    musicId: '', // 音乐id
				    musicLink: '', // 音乐的链接
				    currentTime: '00:00',  // 实时时间
				    durationTime: '00:00', // 总时长
				    currentWidth: 0, // 实时进度条的宽度
				    isdrag:false,
				    songstyle:1, //播放模式 1 为顺序播放 2 为随机播放 3 为单曲循环
				    isshowlrc:false, //是否显示歌词
				    songlrc:'',//歌词
				    songindex:-1,//当前播放歌词的下标
				    top:'',//歌词滚动
					CurrentTime:'',
					type: 'center',
					// backgroundAudioManager:''
			}
		  },
		  onLoad(options) {
			   PubSub.subscribe("musicId", (msg, musicId) => {
			       this.getlrc(musicId)
			        // 自动播放当前的音乐
			        this.musicControl(true, musicId);
				console.log( musicId,'音乐idhhhh')
			        // 取消订阅
			        // PubSub.unsubscribe('musicId');
			      });
			  // console.log(options,'音乐id')
			   //获取音乐播放模式
			this.songstyle=getApp().globalData.songstyle || 1
		   let musicId=options.musicId
		    let issame = musicId == getApp().globalData.musicId
			console.log(issame,'是否同一首歌')
		    if (!issame)
		     {
		      // 加载时自动播放
		    this.musicControl(true, musicId)}
			  //获取歌词
			 this.getlrc(musicId)
		    this.musicId=musicId
	      // 判断当前页面音乐是否在播放
	         if (getApp().globalData.isMusicPlay && getApp().globalData.musicId === musicId) {
	           // 修改当前页面音乐播放状态为true
	           this.isPlay=true
	         }
			  // 创建控制音乐播放的实例
			    backgroundAudioManager = uni.getBackgroundAudioManager();
				 // 监视音乐播放/暂停/停止
				    backgroundAudioManager.onPlay(() => {
				      this.changePlayState(true);
				      // 修改全局音乐播放的状态
				      getApp().globalData.musicId = musicId;
				    });
				    backgroundAudioManager.onPause(() => {
				      this.changePlayState(false);
					  this.CurrentTime=backgroundAudioManager.currentTime
				    });
				    backgroundAudioManager.onStop(() => {
				      this.changePlayState(false);
				    });
			// 监听音乐播放自然结束
			backgroundAudioManager.onEnded(() => {
			  // 自动切换至下一首音乐，并且自动播放
			  console.log(this.songstyle,'this.songstyle')
			  if (this.songstyle == 1 || this.songstyle == 2) {
			    let detail = {
			      type: "next",
			      songstyle: this.songstyle,
			    }
			    PubSub.publish("switchType", detail);
			    // 将实时进度条的长度还原成 0；时间还原成 0；
			    this.currentWidth=0,
			    this.currentTime= "00:00"
			} 
			else {
			    this.musicControl(true, this.musicId)
				this.getlrc(this.musicId)
			  }
			});
			
			  // 监听音乐实时播放的进度
			  // if (!this.isdrag) {
			      backgroundAudioManager.onTimeUpdate(() => {
			        //歌词随播放滚动
			        let playtime = backgroundAudioManager.currentTime;
					uni.showToast({
						title:playtime,
						duration:1000,
						icon:'success'
					})
			        var listlrc = this.songlrc;
			        //最后一句歌词没有下一句，所以不需要跟下一句歌词的时间作比较
			        if (this.songindex == listlrc.length - 2) {
			          if (playtime > listlrc[listlrc.length - 1][0]) {
			            this.songindex= listlrc.length - 1
			          }
			        } else {
			          for (var i = 0; i < listlrc.length - 1; i++) {
			            //歌词区间判断
			            if (listlrc[i][0] < playtime && playtime < listlrc[i + 1][0]) {
			              // console.log(listlrc[i][1])
			              this.songindex=i
			            }
			          }
			        }
			        //定位自动滚动
			        var index = this.songindex;
			        if (index > 3) {
			          this.top=(index - 3) * 40
			        }
			        // 格式化实时的播放时间
			        let currentTime = moment(
			          backgroundAudioManager.currentTime * 1000
			        ).format("mm:ss");
			        let currentWidth =
			          (backgroundAudioManager.currentTime /
			            backgroundAudioManager.duration) *
			          450;
			        this.currentTime=currentTime
			          this.currentWidth=currentWidth
			      })
			    // }
						
						
		  },
		  methods:{
			  shareweixin() {
				   console.log('分享')
			  		  uni.share({
			  		  	provider: "weixin",
			  		  	scene: "WXSceneSession",
			  		  	type: 3,
			  		  	href: this.musicLink,
			  		  	title: "郎小宝音乐分享",
			  		  	summary: "我在郎小宝发现一首好听的音乐，分享给你听听！",
			  		  	imageUrl: this.song.pic,
						mediaUrl:this.musicLink,
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
			  		  	href: this.musicLink,
			  		  	title: "郎小宝音乐分享",
			  		  	summary: "我在郎小宝发现一首好听的音乐，分享给你听听！",
			  		  	imageUrl: this.song.pic,
						mediaUrl:this.musicLink,
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
			 this.toggle('top')
			  },
			  toggle(type) {
			  	this.type = type
			  	this.$refs.popup.open(type)
			  },
			   //获取音乐歌词
			    async getlrc(musicId){
			     let lrcdata = await this.$zxl('/idgetmusic', { id: musicId });
				 this.song=lrcdata.data.data[0]
				this.$nextTick(()=>{
					this.durationTime=moment(
					    this.song.duration* 1000
					   ).format("mm:ss");
				})
			      let lrc_s = lrcdata.data.data[0].lrc
			     this.songlrc=parseLrc(lrc_s)
			     console.log(this.durationTime,'音乐时长')
			    },
			    //拖动进度条
			    handleTouchStart(event) {
			      this.isdrag= true
			      startX = event.touches[0].clientX - 75
			      console.log(startX)
			      this.currentWidth= startX * 2
	
			    },
			    handleTouchMove(event) {
			  this.isdrag= true
			      moveX = event.touches[0].clientX - 75
			      moveDistance = moveX - startX
			      console.log("move", moveX)
			      if (moveDistance <= 0) {
			        moveDistance = moveX
			      }
			      if (moveDistance >= 225) {
			        moveDistance = 225
			      }
			      this.currentWidth= moveDistance * 2
			       this.isdrag= true
			    
			    },
			    handleTouchEnd() {
			      let currenttime =
			        ((moveDistance * 2) / 450) * backgroundAudioManager.duration
			      backgroundAudioManager.seek(currenttime)
			    },
			   //点击进度条
			    handclick(event) {
			      startX = event.touches[0].clientX - 75;
			      console.log(startX);
			      this.currentWidth=startX * 2;
			      let currenttime =
			        ((startX * 2) / 450) * backgroundAudioManager.duration;
					console.log(currenttime)
			      backgroundAudioManager.seek(currenttime);
			    },
			   // 点击切歌的回调
			    handleSwitch(event) {
			      // 获取切歌的类型
				  // console.log(event,'获取切歌的类型')
			      // let type = event.currentTarget.id;
			      let detail = {
			        type: event.currentTarget.id,
			        songstyle: this.songstyle,
			      }
			      // 关闭当前播放的音乐
			      backgroundAudioManager.stop();
			      PubSub.publish("switchType", detail);
			    },
			   // 修改播放状态的功能函数
			    changePlayState(isPlay) {
			      // 修改音乐是否的状态
			      this.isPlay=isPlay
			      // 修改全局音乐播放的状态
			      getApp().globalData.isMusicPlay = isPlay;
			    },
			   //切换显示歌词
			    showlrc(){
			      if(this.isshowlrc){
			        this.isshowlrc=false
			      } else{
			        this.isshowlrc=true

			      }
			  
			    },
			   //切换播放模式
			     changestyle(){
			       if(this.songstyle==1){
			         this.songstyle=2
			         getApp().globalData.songstyle = this.songstyle
			       }
			       else if (this.songstyle == 2){
			         this.songstyle = 3
			         getApp().globalData.songstyle = this.songstyle
			       }
			       else{
			      this.songstyle = 1
			         getApp().globalData.songstyle = this.songstyle
			       }
			     },
				  // 点击播放/暂停的回调
				   handleMusicPlay() {
				     this.isPlay = !this.isPlay;
					 console.log(this.isPlay,'播放状态')
				     // // 修改是否播放的状态
				     this.musicControl(this.isPlay, this.musicId,this.musicLink)
				   },
				   // 控制音乐播放/暂停的功能函数
				     async musicControl(isPlay, musicId, musicLink){
						 console.log(musicId,'收到id')
				       if (isPlay) { // 音乐播放
				           // 获取音乐播放链接
				         if (!musicLink){
				          let musicLinkData = await this.$zxl('/idgetmusic', { id: musicId });
				          let musicLink = musicLinkData.data.data[0].src;
				          this.musicLink=musicLink
						  getApp().globalData.musicLink=musicLink
				          uni.setNavigationBarTitle({
				                title: musicLinkData.data.data[0].title
				              })
				        }
				       //创建控制音乐播放的实例
					   backgroundAudioManager.src = musicLink || this.musicLink
					   backgroundAudioManager.title = this.song.title;
	                this.durationTime=moment(
	            backgroundAudioManager.duration * 1000
	).format("mm:ss");
						   // backgroundAudioManager.seek(this.currenttime);
						    backgroundAudioManager.play();
							let zxl=this.CurrentTime
						    backgroundAudioManager.seek(zxl);
							console.log(this.CurrentTime)
						  
				       } else {// 暂停音乐
				         backgroundAudioManager.pause();
				         }
				     },
		  }
		  
		}
</script>
<style>
	page{
		background: -webkit-linear-gradient(top, pink, #999999);
	}
</style>
<style lang="scss" scoped>

  page{
  	width: 100%;
  	height: 100%;
}
.circle image:first-child{
	
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

	.text {
		font-size: 12px;
		color: #333;
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
.songDetailContainer {
  height: 100%;
  // background: rgba(0, 0, 0, 0.5);
  // background: -webkit-linear-gradient(top, pink, #999999);
  display: flex;
  flex-direction: column;
  align-items: center;
}
 .author{
   width: 400rpx;
   text-align: center;
   white-space: nowrap; /* 设置文本不换行 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  text-overflow: ellipsis; /* 显示省略号 */
   
 }
 .lrc{

   width: 100%;
   display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
   height: 1000rpx;
   padding-bottom: 20rpx;
   /* overflow: hidden; */
 }
 .lrc view{
   height: 80rpx;
    width:100%;
   line-height: 80rpx;
   text-align: center;
   color:#999;


  
 }
.lrc .lrcstyle{
  font-size: 40rpx;
  color:aqua;
}
/* 底座 */
.circle {
  position: relative;
  z-index: 100;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: #fff;
  margin: 10rpx 0;
}
/* 摇杆 */
.needle {
  position: relative;
  z-index: 99;
  top: -40rpx;
  left: 60rpx;
  width: 192rpx;
  height: 274rpx;
  transform-origin: 40rpx 0;
  transform: rotate(-20deg);
  transition: transform 1s;
}

.needleRotate {
  transform: rotate(0deg);
}


/* 磁盘 */
.discContainer {
  position: relative;
  top: -170rpx;
  width: 598rpx;
  height: 598rpx;
  animation: disc 6s linear infinite;
   animation-delay: 1s;
}

.discAnimation {
 animation-delay: 1s;
  animation-play-state: running;

}
.animationpaused{
   animation-play-state: paused;
    /* animation-delay: 1s; */

}

/*
  @keyframes: 设置动画帧
    1) from to
      - 使用于简单的动画，只有起始帧和结束帧
      - 北京 - 上海  直达
    2) 百分比
      - 多用于复杂的动画，动画不止两帧
      - 北京 - 上海 ---> 北京 -- 天津 --- 深圳 --- 上海
      - 0% - 100%, 可以任意拆分

*/

@keyframes disc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


.disc {
  width: 598rpx;
  height: 598rpx;
}


.musicImg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 370rpx;
  height: 370rpx;
  border-radius: 50%;

}


/* 底部控制区域 */
.musicControl {
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  bottom: 60rpx;
  left: 0;
  border-top: 1rpx solid #fff;
  width: 100%;
  display: flex;padding-top: 10rpx;

}

.musicControl  image {
  width: 100rpx;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  color: #fff;
  font-size: 50rpx;
}

.musicControl  image .big{
  font-size: 70rpx;
}


/* 进度条控制区域 */
.progressControl {
  position: absolute;
  bottom: 200rpx;
  width: 640rpx;
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
}


.barControl {
  position: relative;
  width: 450rpx;
  height: 4rpx;
  background: rgba(0, 0, 0, 0.4);
  margin: auto;
}


.audio-currentTime-Bar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 4rpx;
  background: red;

}


/* 小圆球 */
.audio-circle {
  position: absolute;
  right: -12rpx;
  top: -4rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: aqua;
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
</style>
