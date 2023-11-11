<template>
	<view>
		<view class="other" @click="tosetting" v-if="status">
			<text class="title">好友备注</text>
			<view class="">
				<text>{{beizhu}}</text>
				<text class="more"> > </text>
			</view>
		</view>
		<view class="del" @click="openModal" v-if="status">
			<text class="title" style="color: red;">删除好友</text>
		</view>
		<view class="no" v-if="!status">
			<image src="../../../static/images/memory/kuqii.png" mode=""></image>
			你和{{name}}还没有建立好友关系
		</view>
		<uv-modal ref="modal" :content="tip" width="500rpx" :showCancelButton="true" :buttonReverse="true"
			@confirm="delfriend"></uv-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myid: null,
				friendid: null,
				beizhu: '',
				usernamrelength: 10,
				id: null,
				name: null,
				status: 0,
				tip: ''
			}
		},
		onLoad(e) {
			console.log(e)
			this.myid = e.myid
			this.friendid = e.friendid
			this.name = e.name
			this.tip = `确认要删除好友${this.name}吗？`
			this.beizhu = this.name
			this.getstatus()
		},
		onShow() {
			this.getstatus()
		},
		methods: {
			openModal() {
				this.$refs.modal.open();
			},
			async getstatus() {
				let res = await this.$zxl('/getapplystatus', {
					myid: this.myid,
					friendid: this.friendid
				})
				console.log(res.data.data[0].status, '申请状态')
				if (res.data.status == 200) {
					if (res.data.data[0].beizhu) {
						this.beizhu = res.data.data[0].beizhu
						this.tip = `确认要删除好友${this.beizhu}吗？`
					} else {
						this.beizhu = this.name
						this.tip = `确认要删除好友${this.name}吗？`
					}
					this.id = res.data.data[0].id
					this.status = res.data.data[0].status
				} else {
					this.status = 0
					this.beizhu = this.name
					this.tip = `确认要删除好友${this.name}吗？`
				}

			},
			async delfriend() {
				let res = await this.$zxl('/deletefriend', {
					myid: this.myid,
					friendid: this.friendid
				})
				if (res.data.status == 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: "已删除",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					uni.$emit('deletefriend')
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				}
			},
			tosetting() {
				uni.navigateTo({
					url: `/pages/chat/setbeizhu/setbeizhu?friendid=${this.friendid}&myid=${this.myid}&name=${this.beizhu}&id=${this.id}`,
					animationType: 'zoom-fade-out'
				})
			},
		},

	}
</script>

<style lang="less" scoped>
	.no {
		margin: 0 auto;
		box-sizing: border-box;
		width: 700rpx;
		height: 400rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #ebeef5;
		align-items: center;
		font-size: 35rpx;
		color: #999;
		background: #fff;
		padding: 20rpx 40rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.del {
		margin: 0 auto;
		box-sizing: border-box;
		width: 700rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		display: flex;
		justify-content: center;
		border: 1px solid #ebeef5;
		align-items: center;
		font-size: 35rpx;
		color: #999;
		background: #fff;
		padding: 20rpx 40rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;
	}

	.other {
		margin: 0 auto;
		box-sizing: border-box;
		width: 700rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border: 1px solid #ebeef5;
		align-items: center;
		font-size: 35rpx;
		color: #999;
		background: #fff;
		padding: 20rpx 40rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;

		view {
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				margin-left: 20rpx;
			}
		}

		image {
			width: 50rpx;
			height: 50rpx;
			// margin-right: -400rpx;
		}

		.title {
			text-align: left;
		}
	}

	.zxl {
		width: 650rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		// border-bottom: solid 1rpx #999;
		align-items: center;
	}

	.box {
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

		.left {
			width: 50%;
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
		}

		.right {
			width: 50%;
			text-align: center;
			height: 100rpx;
		}
	}
</style>