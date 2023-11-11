<template>
 <view class="main">
   <view class="recentItem"  >
	   <!-- <checkbox-group @change="ischecked(item.id)"> -->
	   <checkbox-group @change="ischecked" :data-id="item.id" >
	   	<label>
	   		 <checkbox class="yuan"   v-if="del"  :checked="selectarr.indexOf(item.id)!=-1"/>
	   	</label>
	   </checkbox-group>
	  
    <view class="left" @click="toinfo(item.id,item.filePath,item.name)">
    	<!-- <image :src="videoinfo.cover" mode="" v-if="videoinfo.cover"></image> -->
    	<image src="../../static/images/bg/3.jpg" mode="" ></image>
		<text>{{duration}}</text>
    </view>
	<view class="right" @click="toinfo(item.id,item.filePath,item.name)">
		<text>{{item.name}}</text>
		<text>{{downtime}}</text>
		<text>{{size}}</text>
	</view>
	</view>

 </view>
</template>

<script>
	import moment from 'moment'
	export default {
		props: {
		  item: Object,
		  del:Boolean,
		  selectarr:Array
		},
		name:"VideoItem",
		data() {
			return {
				timetotal:'',
				danmu:[],
				size:'',
				downtime:'',
				videoinfo:'',
			    ischeck:false,
				duration:''

			}
		
		},
	created() {
         
	},
	onShow() {
		uni.$on('selectall',(data)=>{
			console.log('收到了',data)
		})
	},
	onLoad() {
		this.$nextTick(()=>{
			uni.$on('selectall',(data)=>{
				console.log('收到了',data)
			})
		})

		
	},
	mounted() {
		// console.log(this.item.duration)
		this.duration=this.item.duration.replace('_',':')
		this.getdanmu(this.item.id)
		// console.log(this.item)
		this.size=this.$filesize(this.item.size)
		this.downtime=moment(this.item.createTime).format("YYYY-MM-DD HH:mm:ss")
		this.getvideo(this.item.id)
		uni.$on('freshdanmu',this.getdanmu)
	},
	
	methods:{
		ischecked(e){
			// console.log(e.target.value.length)
			// console.log(e.target.dataset.id)
		if(e.target.value.length){
			uni.$emit('true',e.target.dataset.id)
		}else{
			uni.$emit('false',e.target.dataset.id)
		}
		},
		async getvideo(id){
			let res=await this.$zxl('/idgetvideo',{id})
		 this.videoinfo=res.data.data[0]
			// console.log(res.data,'视频信息')
		},
		async getdanmu(zxl){
			let id = zxl || this.item.id
		 	  let res =	await this.$zxl('/getdanmu',{id})
		 	  this.danmu=res.data.data
			  // console.log('更新弹幕')
		 	},
   toinfo(id,filePath,name) {
	   uni.setStorageSync('danmu',JSON.stringify(this.danmu))
     uni.navigateTo({
     	// url:`/pages/VideoInfo/VideoInfo?id=${id}`
		animationType:'zoom-fade-out',
		url:`/pages/downloadvideoinfo/downloadvideoinfo?id=${id}&filePath=${filePath}&name=${name}`
     })
   },
	}
	
	}
</script>

<style lang="less" scoped>
	page{
		// background-color: #FFFAE8;
	}
	.yuan{
		  margin-top: 80rpx;
		  margin-right: 30rpx;
		  
			width: 50rpx;
			height: 50rpx;
			// background-color: red;
		}
.recentItem {
	
		margin-left: 30rpx;
	margin-bottom: 20rpx;
	// background-color: aliceblue;
	  display: flex;
	  height: 200rpx;
	  // align-items: center;
	
	  .right{
		  display: flex;
		   background-color: aliceblue;
		  flex-direction: column;
		  justify-content: space-between;
		  padding: 20rpx 20rpx;
		 border-top-right-radius: 10rpx;
		 border-bottom-right-radius: 10rpx;
	  }
	  .left{
		  // overflow: hidden;
		  position: relative;
		  flex: 1;
		  height: 200rpx;
		  text{
			  position: absolute;
			  bottom: 10rpx;
			  right: 10rpx;
			  padding: 10rpx;
			  border-radius: 5rpx;
			  font-size: 20rpx;
			// background-color: darkgray;
			background: -webkit-linear-gradient(top, pink, #999999);
			opacity: 0.4;
			  color: black;
		  }
		  image{
			  border-top-left-radius: 10rpx;
			  border-bottom-left-radius: 10rpx;
			  width: 300rpx;
			  height: 200rpx;
		  }
	  }
	}
	.right text{
	 font-size: 27rpx;
	 color:#999;
	 display: block;
	 width: 350rpx;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	
	}
	
	.recentItem image {
	  width: 200rpx;
	  height: 200rpx;
	 
	}
</style>