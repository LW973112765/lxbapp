<template>
  <view class="main">
    <view class="top">
        <button type="primary" round @click="getword"
          >愿你每天开心😊</button
        >
    </view>
    <view class="content">{{ value }}</view>
  </view>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    getword() {
	  uni.request({
	  	url:'https://api.vvhan.com/api/joke?type=json',
	  	 success: (res) => {
	  		     this.value = res.data.joke
	  		    }
	  })
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
  min-height: 300px;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  //   margin-top: 20px;
  margin-right: 30px;
  background: radial-gradient(aqua, white);
}
.top,
.content,
.type {
  position: relative;
  margin: 20rpx auto;
  width: 80%;
}

/deep/ .el-button {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 20px;
}
</style>