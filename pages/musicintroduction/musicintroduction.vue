<template>
	<view class="main">
		<scroll-view scroll-y="true" class="article" 
		  refresher-default-style="black"
	>
			<view class="cover">	
				 <view class="discContainer">
				 	<image class="disc" src="/static/images/song/disc.png"></image>
				 	<image  class="musicImg" :src="song.pic"></image>		
				 </view>
				  <image  class="music" :src="song.pic"></image>
			</view>
			<view class="content">
				<view class="">
					歌曲：{{song.title}}
				</view>
				<view class="">
					歌手：{{song.artist}}
				</view>
				<view class="">
					时长：{{durationTime}}
				</view>
				<view class="">
					上传时间：{{song.time |dateFormat}}
				</view>
				<view class="">
					歌曲链接：{{song.src}}
				</view>
				<view class="">
					歌词信息：{{songlrc}}
				</view>
			</view>
			</scroll-view>
	</view>
</template>

<script>
	import {parseLrc} from '../../utils/lyricsformat.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				id:'',
				song:'',
				songlrc:'',
				durationTime:''
			}
		},
		onLoad(e){
			this.id=e.musicId
			this.getmusic(e.musicId)
		     
		},
		methods:{
			onNavigationBarButtonTap(e){
				uni.navigateTo({
					url:"/pages/musiclist/musiclist",
					animationType:'zoom-fade-out'
				})
			},
			async getmusic(musicId){
			 let lrcdata = await this.$zxl('/idgetmusic', { id: musicId });
			 this.song=lrcdata.data.data[0]
			 console.log(lrcdata.data.data[0])
			this.durationTime=moment(
				 lrcdata.data.data[0].duration* 1000
			 ).format("mm:ss");
				let lrc_s = lrcdata.data.data[0].lrc
				this.songlrc=parseLrc(lrc_s)     
				uni.setNavigationBarTitle({
				      title: this.song.title
				    })
				 },
		}
	}
</script>

<style lang="less" scoped>
	.main{
		width: 100%;
	}
	.content{
		position: relative;
		background: -webkit-linear-gradient(top, pink, #999999);
		background-size: cover;
		padding-top: 30rpx;
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		view{
			text-align: center;
			width: 100%;
			margin-bottom: 20rpx;
		}
	}
	.cover{
		position: relative;
		background: url('../../static/images/personal/12.jpg') no-repeat;
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
</style>
