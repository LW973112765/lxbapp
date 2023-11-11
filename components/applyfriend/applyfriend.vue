<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view class="main">
			<view class="box" style="display: flex;justify-content: space-between;align-items: center;">
				<view class="left" style="width: 600rpx; height: 200rpx;display: flex;align-items: center;">
					<image :src="item.avatar" mode=""
						style="width: 100rpx; height: 100rpx;margin-right: 20rpx;border-radius: 50%;"></image>
					<view class="info" style="display: flex;flex-direction: column;align-items: flex-start;">
						<text>{{item.username}}</text>
						<text>{{item.email}}</text>
						<text>{{item.age}}岁</text>
					</view>
				</view>
				<view class="rightzxl"
					style="width: 120rpx; height: 200rpx;display:flex;flex-direction: column;align-items: center;justify-content: center;">
					<view v-if="!click" @click="add" class="right"
						style="color:green;border-radius: 10rpx;width: 120rpx; height: 60rpx;line-height: 60rpx;border: 1rpx solid #999;text-align: center;margin-bottom: 20rpx;">
						同意
					</view>
					<view v-if="!click" @click="del" class="right"
						style="color:red;border-radius: 10rpx;width: 120rpx; height: 60rpx;line-height: 60rpx;border: 1rpx solid #999;text-align: center;">
						拒绝
					</view>
					<view v-if="status==1" class="right"
						style="color:green;width: 120rpx; height: 60rpx;line-height: 60rpx;text-align: center;">
						已同意
					</view>
					<view v-if="status==0" class="right"
						style="color:red;width: 120rpx; height: 60rpx;line-height: 60rpx;text-align: center;">
						已拒绝
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		name: "addfriend",
		props: ['item'],
		data() {
			return {
				click: false,
				status: 3
			};
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		methods: {
			async del() {
				this.click = !this.click
				let res = await this.$zxl('/delfriendapply', {
					id: this.item.id,
				})

				this.status = 0
				this.$refs.uToast.show({
					type: 'success',
					message: "已拒绝",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})

			},
			async add() {
				this.click = !this.click
				let res = await this.$zxl('/addfriend', {
					myid: this.userinfo.id,
					friendid: this.item.myid,
					status: 1
				}, 'POST')
				if (res.data.status == 200) {
					this.status = 1
					this.$refs.uToast.show({
						type: 'success',
						message: "已同意",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					this.editfriend()
					this.deletefriendapply()
				}
			},
			async deletefriendapply() {
				await this.$zxl('/deletefriendapply', {
					myid: this.item.myid,
					friendid: this.userinfo.id,
				})
			},
			async editfriend() {
				await this.$zxl('/editfriend', {
					id: this.item.id,
					status: 1
				}, 'POST')
			}

		}
	}
</script>

<style lang="less" scoped>
	.main {
		width: 700rpx;
		height: auto;
		box-sizing: border-box;
		padding: 0 20rpx;
		margin: 20rpx auto;

	}
</style>