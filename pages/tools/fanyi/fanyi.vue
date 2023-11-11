<template>
  <view class="main">
    <section class="fanyi">
      <h3 class="jumbotron-heading">翻译官</h3>
      <view class="zxl">
        <textarea  v-model="keyWord"  placeholder="请输入你要翻译的内容" auto-height>	
		</textarea>
        <button @click="searchUsers">翻译</button>
      </view>
      <view class="content">
        {{ value }}
      </view>
    </section>
	<uni-popup ref="message" type="message" animation>
		<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
	</uni-popup>
  </view>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
      value: "",
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
    searchUsers() {
		if(this.keyWord.trim()==''){
		this.messageToggle('warn','翻译内容不能为空哦😊！')
		}
		else{
			uni.request({
				url:'https://api.vvhan.com/api/fy',
					data:{text:this.keyWord},
					
					   success: (res) => {
					        console.log(res.data.data.fanyi);
					     this.value = res.data.data.fanyi;
					    }
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
.fanyi {
  margin: 0 auto;
  width: 500rpx;
  // height: 40rpx;
}
textarea {
  outline: none;
  border-radius: 5rpx;
  margin-bottom: 20rpx;
  background-color: aliceblue;
  // height: 80rpx;
  width: 500rpx;
}
h3 {
  text-align: center;
  margin-bottom: 10rpx;
}
textarea {
  margin-top: 20rpx;
  text-align: center;
  resize: none;
  outline: none;
  color: red;
  border-radius: 5rpx;
  background: radial-gradient(white, aqua);
}
.zxl {
  text-align: center;
  button {
    cursor: pointer;
    width: 150rpx;
    height: 80rpx;
	line-height: 80rpx;
    border-radius: 5rpx;
    background: radial-gradient(white, #999999);
  }
}
.main {
  padding-top: 30rpx;
  width: 100%;
  height: 100%;
   // background: -webkit-linear-gradient(top, pink, #999999);
}
.content {
  text-align: center;
  width: 100%;
  min-height: 300rpx;
  height: auto;
  text-align: center;
  font-size: 40rpx;
  color: red;
  border-radius: 5rpx;
  background: radial-gradient(white, aqua);
  margin: 0 auto;
  margin-top: 20rpx;
}
</style>
