<template>
	<view class="messageList">
		<ul class="ul">
			<li class="li">
				<view class="li-item">
					<image class="image" :src="item.avatar" @click="tozhuye(item.senderid)" />
					<view class="top">
						<view class="lw">
							<image style="margin-top: -15rpx;" src="./4.png" mode=""
								v-show="item.senderid == userinfo.id" @click="deleteMessage(item.id)"></image>
						</view>
						<view class="fw username">
							<text>{{ item.username }}</text>
							<text v-if="userinfo.id==item.senderid" style="font-size: 25rpx;" class="email">我</text>
							<text v-if="userinfo.id!=item.senderid&&status&&isfriend" style="font-size: 25rpx;"
								class="email">朋友</text>
						</view>
						<view class="content">{{ item.content }}</view>
						<view class="value">
							{{ computedtime(item.created_at) }}
						</view>
						<ul class="soncomment">
							<li v-for="code in commentList" :key="code.id">
								<view class="li-item">
									<image style="width: 50rpx;height: 50rpx;" class="image" :src="code.avatar"
										alt="" />
									<view class="top">
										<view class="nickanme">
											<text class="fw" style="font-size: 25rpx;">管理员{{ code.answername }}</text>
											<image style="width: 30rpx;height: 30rpx;"
												src="../../static/images/kongtiao/huifu.png" mode=""></image>
											<text style="font-size: 25rpx;">{{ code.username }}: </text>

										</view>
										<view style="font-size: 25rpx;" class="replycontent">{{ code.content }}
										</view>
										<view class="value">
											{{ computedtime(code.created_at) }}
										</view>
									</view>
								</view>
							</li>
						</ul>
					</view>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		props: ["item"],
		data() {
			return {
				textarea1: "",
				isfriend: false,
				status: 0,
				commentList: [],
			};
		},
		created() {
			this.getcomment(1, this.item.id);
			this.getstatus()
		},
		mounted() {
			// console.log("留言收到的id", this.item, this.item.id);
			console.log('解析', this.$emojitwo("&#128527;&#128561;&#128557;&#128530;&#128536;&#128517;"))
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		methods: {
			async getstatus() {
				let res = await this.$zxl('/getapplystatus', {
					myid: this.userinfo.id,
					friendid: this.item.senderid
				})
				// console.log(res.data.data, '申请状态')
				if (res.data.status == 200) {
					this.status = res.data.data[0].status
					this.isfriend = res.data.isapply
					// console.log(this.status, this.isfriend)
				} else {
					this.isfriend = res.data.isapply
					this.status = 0
				}

			},
			computedtime(time) {
				return this.$computedtimetwo(time)
			},
			tozhuye(id) {
				uni.navigateTo({
					url: `/pages/zhuye/zhuye?id=${id}`,
					animationType: 'zoom-fade-out'
				})
			},
			async getcomment(page, id) {
				let res = await this.$zxl('/getmessageanswer', {
					page,
					id
				})
				if (res.data.status === 200) {
					console.log("数据", res.data);
					this.commentList = res.data.data;
					this.total = res.data.total;
				}
			},

			async deleteMessage(id) {
				let res = await this.$zxl('/deletemessage', {
					id
				})
				if (res.data.status === 200) {
					uni.showToast({
						icon: "success",
						title: '已删除😊',
						duration: 1000,
						position: 'top'
					})
					this.$emit("updatalist", "宝宝");
				}

			},
		},
	};
</script>
<style lang="less" scoped>
	.messageList {
		width: 100%;
		height: auto;
	}

	.callback {
		color: #337ab7;
		font-size: 14rpx;
	}

	li::marker {
		content: '';
	}

	.ul {
		padding: 0 30rpx;
		list-style: none;
	}

	image {
		width: 50rpx;
		height: 50rpx;
	}

	.fw {
		font-weight: 900;
		padding-right: 5rpx;
	}

	.replycontent {
		margin: 4rpx 0;
		word-wrap: break-word;
		word-break: break-all;
	}

	.username {
		max-width: 350rpx;
		font-size: 12rpx;
		margin-bottom: 4rpx;
		display: flex;
		// justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;

		text {
			display: block;
			height: 30rpx;
			line-height: 30rpx;
		}
	}

	.content {
		margin-bottom: 4rpx;
		color: #555;
		font-size: 25rpx;


		// width: 60%;
		// box-sizing: border-box;
		// text-align: center;
		// height: auto;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		word-wrap: break-word;
		word-break: break-all;
	}

	.email {
		display: block;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-radius: 2rpx;
		// padding: 5rpx;
		padding: 0 10rpx;
		font-size: 10rpx !important;
		background-color: lightgrey;
		color: #99999 !important;
		margin-left: 10rpx;
	}

	ul {
		color: #333;
		font-size: 14rpx;

		li {
			margin-bottom: 10rpx;

			.li-item {
				display: flex;
			}

			.image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.top {
				position: relative;
				flex: 1;
				padding-left: 15rpx;
			}

			.value {
				margin-bottom: 10rpx;
				font-size: 25rpx;
			}
		}
	}

	.lw {
		position: absolute;
		top: 5rpx;
		right: 30rpx;

		i {
			font-size: 20rpx;
			color: #999;
		}

		text {
			margin-left: 5rpx;
			padding-left: 5rpx;
			margin-left: 5rpx;
			cursor: pointer;
		}
	}

	.fatherinput {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fatherinput .zxl {
		background: -webkit-linear-gradient(left, blue, #999999);
		color: red;
		display: inline-block;
		text-align: center;
		margin-left: 10rpx;
		border-radius: 50%;
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		cursor: pointer;
	}

	.fatherinput .el-icon-close {
		font-size: 18rpx;
		cursor: pointer;
		margin-left: 15rpx;
	}

	.soncomment {
		transform: translateX(-110rpx);
	}

	.nickanme {
		display: flex;
		// justify-content: space-between;
		align-items: center;
	}
</style>