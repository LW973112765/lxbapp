<template>
	<view class="commentlist">
		<ul class="ul">
			<li class="li">
				<view class="li-item">
					<image style="width:100rpx;height: 100rpx;" class="image" :src="item.avatar"
						@click="tozhuye(item.senderid)" />
					<view class="top">
						<view class="fw username">
							<text style="font-size: 25rpx;">{{ item.username }}</text><text style="font-size: 25rpx;"
								class="email">{{ item.email }}</text>
						</view>
						<view style="font-size: 25rpx;" class="content">{{ item.content }}</view>
						<view class="value" style="font-size: 25rpx;">
							<text>{{ item.created_at | dateFormat }}</text>• <text
								style="color: #999;">{{item.address }}</text>
						</view>
						<view class="lw">
							<image src="./3.png" mode="" class="delete" @click="father"></image>
							<view v-show="item.username === userinfo.username">
								<image class="delete" src="./4.png" @click.stop="deletecommentfather(item.id)"></image>
							</view>
						</view>
						<view class="fatherinput" v-show="currentShow == item.id&&item.id==currendid">
							<input type="textarea" placeholder="请输入内容" v-model="textarea1" maxlength="500"
								show-word-limit resize="none" />

							<image class="cancel" src="./1.png" alt="" @click="submit(item.id, item.senderid)" />
							<image src="./2.png" @click="currentShow = -2"></image>
						</view>
						<ul v-show="isopen" class="soncom">
							<li v-for="code in commentList" :key="code.id">
								<view class="li-item">
									<image style="width:100rpx;height: 100rpx;" class="image" :src="code.avatar" alt=""
										@click="tozhuye(code.senderid)" />
									<view class="top">
										<view class="lw">
											<image src="./3.png" mode="" class="delete" @click="son(code.id)">
											</image>
											<view v-show="code.senderid == userinfo.id">
												<image class="delete" src="./4.png"
													@click.stop="deletecomment(code.id)"></image>
											</view>
										</view>
										<view class="nickanme">
											<text style="font-size: 25rpx;" class="fw">{{ code.sendername }}</text>
											<text style="font-size: 25rpx;"> 回复 {{ code.answername }}: </text>
											<view style="font-size: 25rpx;" class="replycontent">{{ code.content }}
											</view>
										</view>
										<view class="codevalue" style="font-size: 25rpx;">
											<text>{{ code.created_at | dateFormat }}</text> •
											<text style="color: #999;">{{code.address}}</text>
										</view>
										<view class="fatherinput" v-show="currentShow == code.id&&item.id==currendid">
											<input type="textarea" placeholder="请输入内容" v-model="textarea1"
												maxlength="500" show-word-limit resize="none" />

											<image style="width: 50rpx;height: 50rpx;" src="./1.png" alt=""
												@click="submit2(item.id, code.senderid)" />
											<image src="./2.png" @click="currentShow = -2"></image>
										</view>
									</view>
								</view>
							</li>
						</ul>
					</view>
				</view>
				<view class="open" v-show="isopen === false && total" @click="isopen = true">
					<image style="width:30rpx;height: 30rpx;" src="../../static/images/other/hx.png" mode=""></image>
					<text style="font-size: 25rpx;">展开{{ total }}条回复</text>
					<image style="width:30rpx;height: 30rpx;" src="../../static/images/other/zk.png" mode=""></image>
				</view>
				<view class="open" v-show="isopen === true&&total" @click="isopen = false">
					<image style="width:30rpx;height: 30rpx;" src="../../static/images/other/hx.png" mode=""></image>
					<text style="font-size: 25rpx;">收起</text>
					<image style="width:30rpx;height: 30rpx;" src="../../static/images/other/sq.png" mode=""></image>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	import moment from "moment";
	import {
		mapState
	} from "vuex";
	export default {
		props: ["articleid", "item", "currendid"],
		name: 'CommentList',
		data() {
			return {
				isopen: false,
				textarea1: "",
				textarea2: "",
				totalPages: 0,
				pageIndex: 1,
				pageSize: 5,
				total: 0,
				commentList: [],
				currentShow: -1,
				address: ''
			};
		},
		// onReachBottom() {
		// 	console.log('到底了')
		// 	uni.showToast({
		// 		title: "已经到底啦😊😊～",
		// 		position: "top",
		// 		icon: "error",
		// 		duration: 1000,
		// 	})
		// },
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		mounted() {},
		methods: {
			father() {
				this.$emit('getcurrentid', this.item.id)
				this.currentShow = this.item.id
				console.log('当前', this.currendid)
			},
			son(id) {
				this.$emit('getcurrentid', this.item.id)
				this.currentShow = id
				console.log('当前', this.currendid)
			},
			getaddress() {
				uni.request({
					url: 'https://api.vvhan.com/api/getIpInfo',
					success: (res) => {
						let data = res.data.info
						this.address = data.prov + data.city
					}
				})
			},
			tozhuye(id) {
				uni.navigateTo({
					url: `/pages/zhuye/zhuye?id=${id}`,
					animationType: 'zoom-fade-out'
				})
			},
			//删除父级评论
			async deletecommentfather(id) {
				await this.$zxl('/deletecomment', {
					id
				})
				uni.showToast({
					title: "删除成功😊😊～",
					position: "top",
					icon: "success",
					duration: 1000,
				})
				// this.getcomment(1, this.item.id);
				this.$emit("etitcomment", "宝宝");

			},
			//删除子级评论
			async deletecomment(id) {
				await this.$zxl('/deletecomment', {
					id
				})
				uni.showToast({
					title: "删除成功😊😊～",
					position: "top",
					icon: "success",
					duration: 1000,
				})
				this.getcomment(this.item.id);
				this.$emit("etitcomment", "宝宝");
			},
			async getcomment(id) {
				let res = await this.$zxl('/getnoauditcommentanswer', {
					id
				})
				if (res.data.status === 200) {
					console.log("数据", res.data);
					res.data.data.forEach(i => {
						i.content = this.$emojitwo(i.content)
					})
					this.commentList = res.data.data;
					this.total = res.data.total;
				} else {
					this.commentList = [];
					this.total = 0;
				}

			},
			async loadMore() {},
			async submit(id, username) {
				console.log(id, username);
				if (!this.textarea1) {
					uni.showToast({
						title: "请填写回复信息哦😊😊～",
						position: "top",
						icon: "error",
						duration: 1000,
					})
					return;
				}
				let params = {
					articleid: this.articleid,
					come: id,
					created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
					content: this.$emojione(this.textarea1),
					senderid: this.userinfo.id,
					answerid: username,
					address: this.address
				};
				console.log(params);
				let res = await this.$zxl('/postcomment', params, 'POST')
				if (res.data.status === 200) {
					this.textarea1 = "";
					uni.showToast({
						title: "回复成功😊",
						position: "top",
						icon: "success",
						duration: 1000,
					})
					this.currentShow = -1
					this.getcomment(this.item.id);
					this.$emit("etitcomment", "宝宝");
					this.isopen = true
					// console.log('kkk')
				}

			},
			async submit2(id, username) {
				console.log(id, username);
				if (!this.textarea1) {
					uni.showToast({
						title: "请填写回复信息哦😊😊～",
						position: "top",
						icon: "error",
						duration: 1000,
					})
					return;
				}
				let params = {
					articleid: this.articleid,
					come: id,
					created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
					content: this.$emojione(this.textarea1),
					senderid: this.userinfo.id,
					answerid: username,
					address: this.address
				};
				console.log(params);
				let res = await this.$zxl('/postcomment', params, 'POST')
				if (res.data.status === 200) {
					this.textarea1 = "";
					uni.showToast({
						title: "回复成功😊",
						position: "top",
						icon: "success",
						duration: 1000,
					})
					this.currentShow = -1
					this.getcomment(this.item.id);
					this.$emit("etitcomment", "宝宝");
				}

			},
		},
		created() {
			this.getcomment(this.item.id);
			this.getaddress()
		},
	};
</script>

<style lang="less" scoped>
	.commentlist {
		width: 100%;
		height: auto;
	}

	.callback {
		color: #337ab7;
		font-size: 14rpx;
	}

	.loadText {
		text-align: center;
		color: #337ab7;
		font-size: 16rpx;
	}

	.ul {
		padding: 0 30rpx;
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
		font-size: 12rpx;
		margin-bottom: 4rpx;
	}

	.content {
		margin-bottom: 4rpx;
		color: #555;
		word-wrap: break-word;
		word-break: break-all;
	}

	.email {
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
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
			}

			.top {
				position: relative;
				flex: 1;
				padding-left: 15rpx;
			}

			.value {
				margin-bottom: 10rpx;
				// background-color: red;
			}

			.codevalue {
				margin-bottom: 10rpx;
				// width: 400rpx;
				// display: block;
				// white-space: nowrap;
				// overflow: hidden;
				// text-overflow: ellipsis;
			}
		}
	}

	.fatherinput {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fatherinput image {
		display: inline-block;
		text-align: center;
		margin-left: 10rpx;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		cursor: pointer;
	}

	.fatherinput .el-icon-close {
		font-size: 30rpx;
		cursor: pointer;
		margin-left: 15rpx;
	}

	.open {
		cursor: pointer;
		height: 30rpx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		line-height: 30rpx;
		margin-left: 50rpx;

		text {
			margin-left: 5rpx;
			color: #999;
		}
	}

	ul {
		list-style: none;
	}

	.cancel {
		width: 50rpx !important;
		height: 50rpx !important;
		margin-left: 30rpx !important;
	}

	.delete {
		width: 40rpx !important;
		height: 40rpx !important;
		margin-left: 30rpx !important;
	}

	.lw {
		width: 200rpx;
		position: absolute;
		top: 5rpx;
		right: -80rpx;
		display: flex
	}

	input {
		border: 1rpx solid gainsboro;
	}

	.soncom {
		transform: translateX(-100rpx);
	}
</style>