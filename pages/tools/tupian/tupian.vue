<template>
  <view class="main">
	  <uni-popup ref="message" type="message" animation>
	  	<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
	  </uni-popup>
    <view class="top">
     <button class="btn" type="primary" round @click="getphoto">获取美图</button>
    </view>
    <view class="content"><image :src="img" /></view>
  </view>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
		img: require("../../../static/images/bg/2.jpg"),
		type: 'center',
		msgType: 'success',
		messageText: '这是一条成功提示',
    };
  },
  methods: {
	  messageToggle(type,content) {
	  	this.msgType = type
	  	this.messageText = content
	  	this.$refs.message.open()
	  },
    async getphoto() {
		let res=await this.$lw('https://api.uomg.com/api/rand.img2',{sort:'二次元',format:'json'})
		console.log(res.data.imgurl)
		this.img=res.data.imgurl
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

.main {
  padding-top: 30rpx;
  width: 100%;
  height: auto;
  //   margin-top: 20rpx;
  margin-right: 30rpx;
  background: radial-gradient(aqua, white);
}
.top,
.content,
.type {
  position: relative;
  margin: 0 auto;
  width: 80%;
}
/deep/ .uni-select {
background-color: whitesmoke;
width: 100%;
}
.content{
	
	margin-top: 30rpx;
}

image {
  width: 100%;
  height: 1200rpx;
}
.btn{
	margin-top: 30rpx;
	margin-bottom: 30rpx;
}
</style>