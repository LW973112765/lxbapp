<template>
  <view class="main">
	  <view class="cover">
	  	 <view class="discContainer">
	  	 	<image class="disc" src="/static/images/song/disc.png"></image>
	  	 	<image  class="musicImg" :src="song.picurl"></image>		
	  	 </view>
	  	  <image  class="music" :src="song.picurl"></image>
	  </view>
	  <uni-popup ref="message" type="message" animation>
	  	<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
	  </uni-popup>
    <view class="top">
		<uni-section title="本地数据" type="line">
		      <uni-data-select
		        v-model="value"
		        :localdata="options"
		        @change="change"
		      ></uni-data-select>
		    </uni-section>
     <button class="btn" type="primary" round @click="getmusic">获取歌曲</button>
    </view>
   <!-- <view class="content"><image :src="img" /></view> -->
  <view class="audio">
  	<audio  :src="song.url" :poster="song.picurl" :name="song.name" :author="song.artistsname" controls></audio>
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
    };
  },
  onLoad() {
  	this.value="热歌榜"
	this.getmusic()
  },
  methods: {
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