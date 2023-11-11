<template>
    <view class="mainmain">
	
	  <view class="main">
	
	  <scroll-view  scroll-y class="recentScroll" enable-flex v-if="questionList.length>0">
	    <view  
	  	 class="recentItem" v-for="(item,id) in questionList" :key="item.id" @click="toinfo(item.questionid)">
	     <view class="top">
	     	&nbsp;&nbsp;{{item.title}}&nbsp;&nbsp;
	     </view>
	  	 <view class="center">
	  		已提交人数：{{item.people}}
	  	 </view>
	    <view class="buttom">
			发布时间：{{item.endtime}}
		</view>
	  	</view>
	  </scroll-view>

	   <view class="nodata" v-if="questionList.length==0">
	    	<view class="">
	    		<image src="../../static/images/personal/11.png" mode=""></image>
	    	</view>
	    	 <view>你已提交所有问卷哦😊</view>
	    </view>
     </view>
</view>
</template>
<script>
		import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "Article",
  data() {
    return {
	  questionList:[],

    };
  },
  onBackPress() {
  	uni.reLaunch({
  		url:"/pages/personal/personal",
  		animationType:'zoom-fade-out'
  	})
  	return true
  },
  methods: {
  toinfo(qid){
	  // console.log(qid)
			let id=parseInt(qid)
	  uni.navigateTo({
		  animationType:'zoom-fade-out',
	  	url:`/pages/questioninfo/questioninfo?questionid=${id}`
	  })
  },

	 async getQuestionList() {
	       let res =await this.$zxl('/getquestionlistlw',{ username:this.userinfo.username})
	          if (res.data.status === 200) {
	            res.data.data.forEach((data,index) => {
	              data.index=index
	            data.endtime = moment(data.endtime).format(
	              "YYYY-MM-DD HH:mm:ss"
	                );
	            
	              });
	          console.log('问卷',res.data);
	            this.questionList =res.data.data;
	
	          }
	    
	      },

  },
  created() {
    this.getQuestionList()

  },
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.nocontent{
	width: 700rpx;
	height: 500rpx;
	border-radius: 10rpx;
	background-color: #999;
	text-align: center;
	line-height: 500rpx;
	font-size: 50rpx;
	margin: 0 auto;
}
.recentScroll {
	  display: flex;
	  padding-top: 20rpx;
	  width: 100%;
	}
	.recentItem {
		// transition: transform 0.1s;
		position: relative;
		border-radius: 20rpx;
		margin: 0 auto;
	  margin-bottom: 20rpx;
	  display: flex;
	  flex-direction: column;
	   width: 90%;
	  flex-wrap: wrap;
	  // height: 200rpx;
	  height: auto;
	  // background-color: lightgray;
	   background: -webkit-linear-gradient(top, pink, aqua);
	  padding: 20rpx;
	  .top{
		  margin-bottom: 20rpx;
		  margin: 0 auto;
		  text-align: center;
		  font-size: 40rpx;
	  }
	  .center{
		   margin-bottom: 20rpx;
	  }
  

	}


	
	.nodata{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		image{
			width: 200rpx;
			height: 200rpx;
		}
		view{
			margin: 0 auto;
			text-align: center;
			color:#999;
			font-size: 30rpx;
		}
	}
.article {
  width: 100%;
  height: auto;
}
.pagination-wrapper {
  width: 95%;
  background-color: #fff;
}
.navScroll {
  display: flex;
  white-space: nowrap;
  height: 80rpx;
  margin-bottom: 20rpx
}


.navScroll .navItem {
  padding: 0 30rpx;
  font-size: 40rpx;
  height: 80rpx;
  line-height: 80rpx;
  display: inline-block;
  transition: all 0.5s;
}
.navScroll view {
  height: 60rpx;
  box-sizing: border-box;
}


.navItem .active {
  border-bottom: 1rpx solid #d43c33;
  color: #d43c33;
}
</style>
