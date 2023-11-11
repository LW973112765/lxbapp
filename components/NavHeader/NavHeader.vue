<template>
	<view>
		<view class="header">
		   <text class="title">{{title}}</text>
		   <view>
		<text>{{nav}}</text>
		<text class="more" @click="to">查看更多</text>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"NavHeader",
		props:['title','nav'],
		data() {
			return {
				
			};
		},
		methods:{
			to(){
		   if(this.title=='热门文章'){
			   uni.reLaunch({
			   	url:"/pages/article/article",
				animationType:'zoom-fade-out'
			   })
		   }
		   else if(this.title=='最新视频'){
			   uni.reLaunch({
			   	url:"/pages/video/video",
				animationType:'zoom-fade-out'
			   })
		   }
		   else{
			   uni.navigateTo({
			   	url:"/pages/musiclist/musiclist",
				animationType:'zoom-fade-out'
			   })
		   }
			}
		}
	}
</script>

<style lang="less" scoped>
 .header .more{
  float: right;
  transform: translateY(-5rpx);
  border: 1rpx solid #333;
  padding: 10rpx 20rpx;
  font-size: 26rpx;
  border-radius: 30rpx;
  box-sizing: border-box;
}
 .header .title{
font-size: 32rpx;
line-height: 80rpx;
color: #666;

}
</style>