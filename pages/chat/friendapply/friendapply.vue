<template>
	<view>
		<applyfriend v-if="dataList.length>0" v-for="(item,index) in dataList" :key="item.id" :item="item"></applyfriend>
	<view class="nodata" v-if="dataList.length==0">
			  	<view class="">
			  		<image src="../../../static/images/personal/15.png" mode=""></image>
			  	</view>
			  	 <view>无好友申请哦😊</view>
			  </view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				dataList:[],
			}
		},
		created() {
		  this.getdata()
		},
	     computed: {
						  ...mapState("loginModule", ["userinfo"]),
						},
		methods: {
		   async getdata(val){
		   						let res=await this.$zxl('/getfriendapply',{id:this.userinfo.id})
		   						if (res.data.status==200){
		   							this.dataList=res.data.data
		   							console.log(res.data,'好友申请') 
		   					}else{
		   						this.dataList=[]

		   					}
		   					
		   					},
		}
	}
</script>

<style lang="less" scoped>
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
