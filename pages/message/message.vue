<template>
	<view class="main">
		<view class="content">
			<view class="comment">
				<MessagePost @updatemessage="updatemessage" />
			</view>
			<view class="commentlist">
				<MessageList v-for="(item, id) in messageList" :key="item.id" :item="item" @updatalist="updatalist" />
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "MessageInfo",
		data() {
			return {
				n: 1,
				infoData: [],
				total: 0,
				pageSize: 8,
				liulanliang: "",
				messageList: [],
			};
		},

		created() {
			this.n = 1;
			this.getMessage(1);
		},
		methods: {
			updatalist(val) {
				this.onegetMessage(1);
			},
			updatemessage(val) {
				this.onegetMessage(1);
			},
			async onegetMessage(page) {
				let res = await this.$zxl('/getmessage', {
					page
				})
				if (res.data.status === 200) {
					res.data.data.forEach(i => {
						i.content = this.$emojitwo(i.content)
					})
					this.messageList = res.data.data;
					this.total = res.data.total;
				} else {
					this.messageList = []
					this.total = 0
				}
			},
			loadMore() {
				this.n++;
				this.getMessage(this.n);
			},
			async getMessage(page) {
				let res = await this.$zxl('/getmessage', {
					page
				})
				if (res.data.status === 200) {
					console.log(res)
					res.data.data.forEach(i => {
						i.content = this.$emojitwo(i.content)
					})
					this.messageList = this.messageList.concat(res.data.data);
					// this.total = res.data.total;
				}

			},
		},
	};
</script>

<style lang="less" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.main {
		box-sizing: border-box;
		position: relative;
		font-size: 16rpx;
		padding-bottom: 20rpx;
		width: 750rpx;
		height: auto;
		margin: 10rpx auto;
		// background-color: #999999;
	}

	.content {
		width: 100%;
		margin-top: 10rpx;
		// padding-bottom: 30rpx;
		// margin-bottom: 20rpx;
		margin-right: 40rpx;
		background-color: #fff;

		.title {
			width: 100%;
			font-size: 18rpx;
			text-align: center;
			padding-top: 35rpx;
			border-bottom: 1rpx solid #eae6e6;

			.stat {
				padding: 30rpx 42rpx 28rpx 20rpx;
				font-size: 12rpx;
				color: #919898;

				.iconfont {
					margin-right: 5rpx;
				}

				span {
					margin-left: 30rpx;
				}
			}
		}

		.comment {
			width: 100%;
			height: 242rpx;
			margin-bottom: 70rpx;
			// background-color: aqua;
		}

		.commentlist {
			padding-top: 10rpx;
			padding-bottom: 20rpx;
			width: 100%;
			height: auto;
			background-color: #fff;
		}
	}

	.loadText {
		text-align: center;
		color: #337ab7;
		font-size: 16rrpx;
		cursor: pointer;
		margin-bottom: 5rpx;
	}
</style>