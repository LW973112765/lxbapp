<template>
	<view>
		<view class="header">
			<image src="../../../static/images/chat/ss.png" mode=""></image>
			<input v-model="searchval" @input="search($event)"  type="text" placeholder="搜索">
		</view>
	    <addfriend v-if="dataList.length>0 && searchval.trim()!=''" v-for="(item,index) in dataList" :key="item.id" :item="item"></addfriend>
	<!-- 	<view class="nodata" v-if="!issearch && dataList.length==0">
		 	<view class="">
		 		<image src="../../../static/images/personal/15.png" mode=""></image>
		 	</view>
		 	 <view>添加好友😊</view>
		 </view> -->
		 <view class="nodata" v-if="dataList.length==0 && searchval.trim()!=''">
		  	<view class="">
		  		<image src="../../../static/images/personal/15.png" mode=""></image>
		  	</view>
		  	 <view>无搜索结果哦😊</view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				issearch:false,
				dataList:[],
				searchval:"",
				 timer:null
			}
		},
		methods: {
			
			search($event){
				 // console.log($event.detail.value)
				if($event.detail.value.trim()==''){
					this.issearch=false
					this.dataList=[]
					    }
					else{
						clearTimeout(this.timer);
						    this.timer = setTimeout(() => {
						      this.searchuser();
						    }, 1000);
					}
					},
					async searchuser(val){
						let res=await this.$zxl('/usersearch',{search:this.searchval})
						if (res.data.status==200){
							this.$nextTick(()=>{
								this.issearch=!this.issearch
								this.dataList=[]
								this.dataList=res.data.data
							})
							// console.log(res.data.data,'好友搜素') 
					}else{
						this.dataList=[]
						this.issearch=true
					}
					
					},
		}
	}
</script>

<style lang="less" scoped>
	.main{
		width: 700rpx;
		height: auto;
		box-sizing: border-box;
		padding: 0 20rpx;
		margin: 20rpx auto;
		
	}
.header{
	width: 700rpx;
	height: 100rpx;
	box-sizing: border-box;
	padding: 0 20rpx;
	margin: 0 auto;
	border-radius: 10rpx;
	background-color: darkgrey;
	display: flex;
	justify-content: space-between;
	align-items: center;
	image{
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}
	input{
		flex: 1;
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
</style>
