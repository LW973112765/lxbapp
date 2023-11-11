<template>
	<view class="main">
		<view class="header">
			<view class="search">
				历史搜索
			</view>
			<view class="img" @click="clear">
				<image src="../../static/images/fonts/del.png" mode=""></image>
			</view>
		</view>
		<view class="footer">
			<view class="footerson" @click="getsearch(item)" v-for="(item,index) in searchjilu" :key="index">
				<view>{{item}}</view>
			</view>
		</view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message" animation>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="alertDialog" type="dialog" animation>
			<uni-popup-dialog :type="msgType" cancelText="清空" confirmText="取消" title="提示" content="是否确定清空搜索记录?"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				searchjilu: ''
			};
		},
		onLoad() {
			this.getsearchjilu()
		},
		onShow() {
			this.getsearchjilu()
			console.log('onshow')

		},
		methods: {
			getsearch(val) {
				this.keyword = val
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/searchitem/searchitem?searchval=${this.keyword}`
				})
			},
			clear() {
				this.dialogToggle('warn')
			},
			dialogConfirm() {

			},
			dialogClose() {
				uni.removeStorageSync('searchjilu')
				this.getsearchjilu()
			},
			getsearchjilu() {
				let search = uni.getStorageSync("searchjilu");
				if (search) {
					search = JSON.parse(search);
				} else {
					search = []
				}
				this.searchjilu = search
			},
			messageToggle(type, content) {
				this.msgType = type
				this.messageText = content
				this.$refs.message.open()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			onNavigationBarSearchInputChanged(e) {
				console.log(e)
				this.keyword = e.text
			},
			onNavigationBarButtonTap(e) {
				if (e.index == 0) {
					if (this.keyword.trim() == '') {
						this.messageToggle('warn', '关键字不能为空！')
					} else {
						let search = uni.getStorageSync("searchjilu");
						if (search) {
							search = JSON.parse(search);
						} else {
							search = []
						}
						var searchdata = this.keyword
						let result = search.filter((item) => {
							return item != searchdata
						})
						console.log(result)
						result.unshift(searchdata)
						uni.setStorageSync('searchjilu', JSON.stringify(result))
						uni.navigateTo({
							animationType: 'zoom-fade-out',
							url: `/pages/searchitem/searchitem?searchval=${this.keyword}`
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;

	}

	.footer {
		width: 750rpx;
		height: auto;
		box-sizing: border-box;
		margin-top: 5rpx;
		padding: 20rpx;
		display: flex;
		// justify-content: start;
		flex-flow: row wrap;

		.footerson {
			width: auto;
			padding: 20rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			// background-color: darkgrey;
			background: -webkit-linear-gradient(top, pink, #999999);
			border-radius: 5rpx;

		}
	}

	.header {
		width: 750rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		padding: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;

		.search {
			font-size: 40rpx
		}

		.img {
			width: 50rpx;
			height: 50rpx;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>