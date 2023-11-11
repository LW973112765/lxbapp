<template>
  <view class="mainzxl">
	  <uni-popup ref="message" type="message" animation>
	  	<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
	  </uni-popup>
    <section class="lw">
      <h3 class="zxl">狼小宝天气预报</h3>
      <view class="search">
        <input
          type="text"
          placeholder="请输入你要查询的城市名称"
          v-model="keyWord"
        />&nbsp;
        <button type="primary" @click="search">查询</button>
      </view>
      <ul class="main">
        <li>
          <h3>hello {{ city }}</h3>
        </li>
        <li>
          <text>{{ type }}</text
          >{{ low }}<text></text><text>{{ high }}</text>
        </li>
        <li>
          <text>{{ fengxiang }}</text
          ><text>{{ fengli }}</text>
        </li>

        <li>{{ tip }}</li>
        <li>
          <text>{{ zdate }}</text
          ><text>{{ week }}</text>
        </li>
      </ul>
    </section>
  </view>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyWord: "昆明市",
      city: "",
      zdate: "",
      fengli: "",
      fengxiang: "",
      high: "",
      low: "",
      tip: "",
      type: "",
      week: "",
	  type: 'center',
	  msgType: 'success',
	  messageText: '这是一条成功提示',
    };
  },
  mounted() {
     this.search()
  },
  methods: {
	  messageToggle(type,content) {
	  	this.msgType = type
	  	this.messageText = content
	  	this.$refs.message.open()
	  },
    search() {
		if(this.keyWord.trim()==''){
		this.messageToggle('warn','输入内容不能为空哦😊！')
		}
		else{
			uni.request({
				url:'https://api.vvhan.com/api/weather',
					data:{city:this.keyWord},
				 success: (response) => {
					   this.city = response.data.city;
					   this.zdate = response.data.info.date;
					   this.fengli = response.data.info.fengli;
					   this.fengxiang = response.data.info.fengxiang;
					   this.high = response.data.info.high;
					   this.low = response.data.info.low;
					   this.tip = response.data.info.tip;
					   this.type = response.data.info.type;
					   this.week = response.data.info.week;
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
	
.mainzxl {
  margin-top: 41rpx;
  padding-top: 10rpx;
  width: 100%;
  height: auto;
  padding-bottom: 30rpx;
  margin-right: 30rpx;
  background: radial-gradient(aqua, white);
}

.lw {
  margin: 0 auto;
  text-align: center;
}
.search {
	width: 700rpx;
	margin: 0 auto;
  margin-top: 20rpx;
  padding: 30rpx;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  input{
  	background-color: whitesmoke;
  	width: 500rpx;
  	height: 50rpx;
  	margin-bottom: 100rpx;
	border-radius: 10rpx;
  }
 button {
   cursor: pointer;
   width: 160rpx;
   height: 50rpx;
   line-height: 50rpx;
   font-size: 25rpx;
 }
}
.main {
  margin: 0 auto;
  padding-left: 10rpx;
  width: 400rpx;
  height: 400rpx;
}
li {
	width: 400rpx;
  list-style: none;
  margin: 10rpx auto;
  text-align: center;
  color: red;
   text-align: center;
}
</style>
