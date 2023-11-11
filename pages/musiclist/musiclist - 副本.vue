<template>
<view class="recommendSongContainer">
  <!-- 头部  -->
  <view class="header">
    <image src="/static/images/song/recommendSong.jpg"></image>
    <view class="date">
      <text class="day">{{month}} / </text>
      <text class="month">{{day}}</text>
    </view>
  </view>

  <!-- 列表区域 -->
  <view class="ListContainer">
    <view class="listHeader">
      <text>播放列表</text>
    </view>

    <!-- 内容区 -->
    <scroll-view scroll-y class='listScroll'>
      <view class="scrollItem" v-for="(item,id,index) in recommendList" :key="id" :data-index='index' :data-song='item' @click="toSongDetail">
        <image :src="item.pic"></image>
        <view class="musicInfo">
          <text class="musicName">{{item.title}}</text>
          <text class="author">
            <text class="name">{{item.artist}}</text>
          </text>
        </view>
        <text class="iconfont icon-gengduo"></text>
      </view>
    </scroll-view>
  </view>
</view>
</template>

<script>
	import PubSub from 'pubsub-js';
	export default {
		data() {
			return {
				 day: '', // 天
			     month: '', // 月
			     recommendList: [], // 推荐列表数据
				 index: 0, // 点击音乐的下标
			};
		},
		onLoad() {
			 this.day=new Date().getDate(),
		   this.month=new Date().getMonth() + 1
		     this.getRecommendList();
			  // 订阅来自songDetail页面发布的消息
			     PubSub.subscribe('switchType', (msg, detail) => {
			       // console.log(detail)
			       let recommendList=this.recommendList
				   let index  = this.index
			       if (detail.type === 'pre') { // 上一首
			          if(detail.songstyle==1 || detail.songstyle==3){
			            (index === 0) && (index = recommendList.length);
			            index -= 1;
			          }
			          else{
			            let randomNum = Math.floor(Math.random() * (recommendList.length+1));
			            if (index == randomNum){
			              randomNum = Math.floor(Math.random() * (recommendList.length + 1));
			            }
			            index = randomNum
			          }
			       } else { // 下一首
			         if (detail.songstyle == 1 || detail.songstyle == 3){
			           (index === recommendList.length - 1) && (index = -1);
			           index += 1;
			         }
			          else{
			           let randomNum = Math.floor(Math.random() *recommendList.length);
			           if (index == randomNum) {
			             randomNum = Math.floor(Math.random() * recommendList.length );
			           }
			           index = randomNum
			          }
			       }
			 
			       // 更新下标
			       this.index=index
			       let musicId = recommendList[index].id;
			       // 将musicId回传给songDetail页面
			       PubSub.publish('musicId', musicId)
			 
			     });
		},
		methods:{ 
			toSongDetail(event) {
			    let { song, index } = event.currentTarget.dataset;
			    console.log(event.currentTarget.dataset)
			    this.index=index
			    uni.navigateTo({
					animationType:'zoom-fade-out',
			      url:`/pages/musicinfo/musicinfo?musicId=${song.id}`
			    });
			  },
	 async getRecommendList() {
	    let res = await this.$zxl('/getmusic');
	    this.recommendList= res.data.data

	  },
		}
	}
</script>

<style lang="less" scoped>
 page {
   height: 100%;
 }
 
 .recommendSongContainer .header {
   position: relative;
   width: 100%;
   height: 300rpx;
 }
 
 .recommendSongContainer .header image {
   width: 100%;
   height: 100%;
 }
 
 .recommendSongContainer .header .date {
   position: absolute;
   left: 52%;
   top: 55%;
   margin-left: -150rpx;
   margin-top: -50rpx;
   width: 300rpx;
   height: 100rpx;
   text-align: center;
   line-height: 100rpx;
   color: #fff;
 }
 
 .header .date .day {
   font-size: 38rpx;
 }
 
 
 
 /* 列表区域 */
 .ListContainer {
   position: relative;
   top: -20rpx;
   padding: 0 20rpx;
   border-radius: 30rpx;
   background: #fff;
 }
 .listHeader {
   height: 80rpx;
   line-height: 80rpx;
 }
 .listHeader .changeMore {
   float: right;
 }
 
 
 /* 内容区 */
 .listScroll {
   height: calc(100vh - 380rpx);
 }
 .scrollItem {
   position: relative;
   display: flex;
   margin-bottom: 20rpx;
 }
 .scrollItem image {
   width: 80rpx;
   height: 80rpx;
   border-radius: 8rpx;
 }
 
 .musicInfo {
   display: flex;
   flex-direction: column;
   margin-left: 20rpx;
 
 }
 .musicInfo .author .reason{
   color:red;
   font-size: 20rpx;
   background-color: #ffd8cf;
   margin-right: 10rpx;
   border-radius: 10rpx;
   padding: 5rpx;
 }
 .musicInfo .author .name{
   color:#999;
 }
 .musicInfo text {
   height: 40rpx;
   line-height: 40rpx;
   font-size: 24rpx;
   max-width: 500rpx;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 
 
 .scrollItem .iconfont {
   position: absolute;
   right: 0;
   width: 80rpx;
   height: 80rpx;
   line-height: 80rpx;
   text-align: right;
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

</style>

