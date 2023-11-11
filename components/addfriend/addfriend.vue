<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view class="main">
				<view class="box" style="display: flex;justify-content: space-between;align-items: center;">
					<view @click="tozhuye(item.id)" class="left" style="width: 600rpx; height: 200rpx;display: flex;align-items: center;" >
						<image :src="item.avatar" mode=""  style="width: 100rpx; height: 100rpx;margin-right: 20rpx;border-radius: 50%;"></image>
					    <view class="info" style="display: flex;flex-direction: column;align-items: flex-start;">
					    	<text>{{item.username}}</text>
					    	<text>{{item.email}}</text>
					    	<text>{{item.age}}岁</text>
					    </view>
					</view>
					<view v-if="item.id!=userinfo.id && !isapply" @click="add" class="right" style="border-radius: 10rpx;width: 120rpx; height: 60rpx;line-height: 60rpx;border: 1rpx solid #999;text-align: center;">
						添加
					</view>
					<view v-if="isapply && status"  class="right" style="color:green;width: 120rpx; height: 60rpx;line-height: 60rpx;text-align: center;">
						已添加
					</view>
					<view v-if="isapply && !status"  class="right" style="width: 120rpx; height: 60rpx;line-height: 60rpx;text-align: center;">
						等待同意
					</view>
				</view>
			</view>
			
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name:"addfriend",
		props:['item'],
		data() {
			return {
				click:false,
				isapply:null,
				status:null
			};
		},
		created() {
			this.getstatus()
		},
		computed: {
				  ...mapState("loginModule", ["userinfo"]),
				},
		methods:{
			async getstatus(){
				  let res=await this.$zxl('/getapplystatus',{
					  myid:this.userinfo.id,
					  friendid:this.item.id
				  })
				  console.log(res.data.data[0],'申请状态')
				  if(res.data.status==200){
				        this.status=res.data.data[0].status
						  this.isapply=res.data.isapply
				  }
				  else{
					  this.isapply=res.data.isapply
				  }
			},
			async add(){
	          this.click=!this.click
			  let res=await this.$zxl('/addfriend',{
				  myid:this.userinfo.id,
				  friendid:this.item.id
			  },'POST')
			  if(res.data.status==200){
			  	this.$refs.uToast.show({
			  		type: 'success',
			  		message: "已添加，等待对方同意",
			  		iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
			  					})	
				this.getstatus()
			  }
			},
		tozhuye(id){
			uni.navigateTo({
				url:`/pages/zhuye/zhuye?id=${id}`,
				animationType:'zoom-fade-out'
			})
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
</style>