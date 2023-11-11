<template>
	<view>
		<view class="main" >
			<view class="box">
				<view class="left">好友备注</view>
					<input type="text" maxlength="10" v-model="beizhu" style="background-color: azure;height: 60rpx;">
			</view>
			
			<view class="zxl">
				<button style="width: 200rpx;margin-top: 30rpx;" @click="save">保存</button>
				<button style="width: 200rpx;margin-top: 30rpx;" @click="reset">重置</button>
			</view>
				<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myid:null,
				friendid:null,
				beizhu:'',
				usernamrelength:10,
				id:null,
				name:null
			}
		},
		onLoad(e) {
			console.log(e)
			this.myid=e.myid
			this.friendid=e.friendid
			this.name=e.name
			this.beizhu=this.name
			this.getstatus()
		},
		methods: {
			async getstatus(){
				  let res=await this.$zxl('/getapplystatus',{
					  myid:this.myid,
					  friendid:this.friendid
				  })
				  console.log(res.data.data[0],'申请状态')
				  if(res.data.status==200){
					  if(res.data.data[0].beizhu){
						  this.beizhu=res.data.data[0].beizhu
					  }
					  else{
						   this.beizhu=this.name
					  }
					// this.beizhu=res.data.data[0].beizhu
					this.id=res.data.data[0].id
				  }
				  else{
					this.beizhu=this.name
				  }
				
			},
			async save(){
				if(this.beizhu.trim()==''){
					this.$refs.uToast.show({
						type: 'warning',
						message: "请输入",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
									})	
				}
				else{
					let res=await this.$zxl('/editfriend',{
			              beizhu:this.beizhu,
						  id:this.id
						},'POST')
						if (res.data.status === 200) {
						 	this.$refs.uToast.show({
							type: 'success',
							message: "更改成功😊",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
										})	
					  setTimeout(()=>{
						  uni.navigateBack({
						  	delta: 1
						  })
					  },500)
				        } 
						else{
							console.log('出问题')
							this.$refs.uToast.show({
							type: 'error',
							message: "你和对方还未建立好友关系哦😊",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
										})	
						}
			}  },
			reset(){
				this.beizhu=''
			},
		}
	}
</script>

<style lang="less" scoped>
	.zxl{
		width: 650rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		// border-bottom: solid 1rpx #999;
		align-items: center;
	}
.box{
		width: 650rpx;
		margin: 0 auto;
		background-color: whitesmoke;
		height: auto;
		padding: 10rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		// border-bottom: solid 1rpx #999;
		align-items: center;
		.left{
			width: 50%;
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
		}
		.right{
			width: 50%;
			text-align: center;
			height: 100rpx;
		}
	}
</style>
