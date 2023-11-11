<template>
	<view>
		<view class="header">
			<image @click="content=''" src="../../static/images/note/clear.png" mode=""></image>
			<input class="input" maxlength="1000" type="text" v-model="content" placeholder="请输入需要记录的内容..."
				placeholder-class="pcs">
			<image @click="add" src="../../static/images/note/write.png" mode=""></image>
		</view>
		<view class="topone">
			<view class="left ">
				<h3>正在进行</h3>
				<view class="" @click="changeanimationing(['fade', 'slide-left'])">
					<image v-if="!ingshow&&ingdatatotal" src="../../static/images/other/zk.png" mode="">
					</image>
					<image v-if="ingshow&&ingdatatotal" src="../../static/images/other/sq.png" mode=""></image>
				</view>
			</view>
			<view class="right">{{ingdatatotal>99?'99+':ingdatatotal}}</view>
		</view>
		<view class="ing">
			<uni-transition :mode-class="modeClass" :show="ingshow" :duration="500">
				<jishiben-list type="ing" v-if="ingdata.length>0" v-for="(item,index) in ingdata" :item="item"
					:key="item.id" :threshold="threshold" @edit="changeover" @delete="del">
				</jishiben-list>
			</uni-transition>

		</view>
		<view class="toptwo">
			<view class="left">
				<h3>已经完成</h3>
				<view class="" @click="changeanimationover(['fade', 'slide-left'])">
					<image v-if="!overshow&&overdatatotal" src="../../static/images/other/zk.png" mode="">
					</image>
					<image v-if="overshow&&overdatatotal" @click="closeing" src="../../static/images/other/sq.png"
						mode=""></image>
				</view>
			</view>
			<view class="right">{{overdatatotal}}</view>
		</view>
		<view class="over">
			<uni-transition :mode-class="modeClass" :show="overshow" :duration="500">
				<jishiben-list type="over" v-if="overdata.length>0" v-for="(item,index) in overdata" :item="item"
					:key="item.id" :threshold="threshold" @edit="changeing" @delete="del">
				</jishiben-list>
			</uni-transition>

		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import moment from 'moment'
	moment.locale('zh-cn');
	export default {
		data() {
			return {
				modeClass: ['fade'],
				threshold: 50,
				content: '',
				ingdata: [],
				overdata: [],
				ingdatatotal: 0,
				overdatatotal: 0,
				tip: '',
				delid: null,
				ingshow: true,
				overshow: true,
				userid: null,
			};
		},
		onLoad() {
			console.log(this.userinfo.id)
			this.userid = this.userinfo.id
			this.getnote()
		},
		mounted() {
			uni.$on('editnote', (id, content) => {
				console.log(id, content)
				this.update(id, content)
			})
		},
		computed: {
			...mapState('loginModule', ['userinfo'])
		},
		methods: {
			toanition() {
				uni.navigateTo({
					url: '/pages/anition/anition',
				})
			},
			changeanimationing(mode) {
				this.modeClass = mode
				this.ingshow = !this.ingshow

			},
			changeanimationover(mode) {
				this.modeClass = mode
				this.overshow = !this.overshow
			},
			closeing(mode) {
				this.modeClass = mode
				this.ingshow = false

			},
			async changeover(id) {
				console.log('改为已经完成', id)
				let res = await this.$zxl('/updatenote', {
					id,
					isover: 1,
					endtime: moment().format("YYYY-MM-DD HH:mm:ss"),
				}, 'POST')
				if (res.data.status == 200) this.getnote()

			},
			async changeing(id) {
				console.log('改为正在进行', id)
				let res = await this.$zxl('/updatenote', {
					id,
					isover: 0
				}, 'POST')
				if (res.data.status == 200) this.getnote()
			},
			async del(id) {
				console.log(id)
				let res = await this.$zxl('/deletenote', {
					id
				})
				if (res.data.status == 200) {
					uni.$emit('deletenote', false)
					this.getnote()
				}

			},
			async getnote() {
				let res = await this.$zxl('/getnote', {
					userid: this.userid
				})
				if (res.data.status == 200) {
					res.data.data.forEach((data) => {
						data.starttime = moment(data.starttime).format('lll')
						data.endtime = moment(data.endtime).format('lll')
						data.content = this.$emojitwo(data.content)
					});
					this.ingdata = res.data.data.filter(item => !item.isover)
					this.overdata = res.data.data.filter(item => item.isover)
					this.ingdatatotal = this.ingdata.length
					this.overdatatotal = this.overdata.length
					console.log(this.ingdata, '正在进行');
					console.log(this.overdata, '已经完成');
				} else {
					this.ingdata = []
					this.overdata = []
					this.ingdatatotal = 0
					this.overdatatotal = 0
				}
			},
			async add() {
				if (this.content.trim() == '') {
					return
				}
				let res = await this.$zxl('/addnote', {
					content: this.$emojione(this.content.trim()),
					starttime: moment().format("YYYY-MM-DD HH:mm:ss"),
					isover: 0,
					userid: this.userid
				}, 'POST')
				if (res.data.status == 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: "已记录 ",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					this.getnote()
					this.content = ''
				}
			},
			async update(id, content) {
				let res = await this.$zxl('/updatenote', {
					content: this.$emojione(content.trim()),
					id
				}, 'POST')
				if (res.data.status == 200) {
					this.getnote()
					// console.log('修改成功')
				}
			}
		}

	}
</script>
<style>
	page {
		background: url("../../static/images/note/bg.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}
</style>
<style lang="less" scoped>
	.pcs {
		color: #999999;
		font-style: oblique;
	}

	.header {
		width: 750rpx;
		height: 100rpx;
		background-color: antiquewhite;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 50rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;

		.input {
			height: 50rpx;
			width: 500rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			border-radius: 20rpx;
			border: 2rpx solid whitesmoke;
			background-color: white;


		}

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.topone,
	.toptwo {
		width: 750rpx;
		height: 70rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 0 10rpx;

		.left {
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.right {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background-color: whitesmoke;
			// background-color: #999999;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.topone {
		margin-top: 120rpx;
		position: sticky;
		top: 100rpx;
		z-index: 1;
		background-color: antiquewhite;

		h3 {
			font-weight: 500;
			color: red;
		}

		.right {
			color: red;
		}
	}

	.toptwo {
		position: sticky;
		top: 170rpx;
		z-index: 1;
		background-color: antiquewhite;

		h3 {
			font-weight: 500;
			color: springgreen;
		}

		.right {
			color: springgreen;
		}
	}

	.ing {
		width: 720rpx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 20rpx;
	}

	.over {
		width: 720rpx;
		margin: 0 auto;
		box-sizing: border-box;
		margin-top: 20rpx;
	}
</style>