<template>
	<view>
		<view class="header">
			<view class="headerson">
				<text class="one" @click="cancel">取消</text>
				<text class=" title">编辑相册</text>
				<text class="two" @click="save">保存</text>
			</view>
		</view>
		<input type="text" v-model="name" placeholder="添加相册名称">
		<u--textarea v-model="dsc" placeholder="添加相册描述" autoHeight maxlength=30></u--textarea>
		<view class="cover">
			<text>更换封面</text>
			<view @click="toselect" class="" style="display: flex; justify-content: space-around;align-items: center;">
				<image :src="cover" mode="" style="width: 50rpx;height: 50rpx;margin-right: 20rpx;"></image>
				<text>></text>
			</view>
		</view>
		<u-collapse><u-collapse-item title="主题">
				<text slot="value" class="u-page__item__title__slot-title">{{typename}}</text>
				<view class="u-collapse-content">
					<view class="type" v-for="(item,index) in typenames" :key="index" @click="changetype(item.name)">
						<text :class="item.icon" :style="{color:item.name==typename?'aqua':''}"></text>
						<text>{{item.name}}</text>
					</view>
				</view>
			</u-collapse-item></u-collapse>
		<u-button type="error" text="删除相册" @click="del"></u-button>
		<u-toast ref="uToast"></u-toast>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="删除" title="确定要删除吗"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				typename: '请选择',
				cover: '',
				id: null,
				name: '',
				dsc: '',
				typemsg: '',
				typenames: [{
						icon: 'iconfont icon-xiangce2',
						name: '普通'
					},
					{
						icon: 'iconfont icon-a-2',
						name: '夫妻'
					},
					{
						icon: 'iconfont icon-lvyou1',
						name: '旅游'
					},
					{
						icon: 'iconfont icon-familyzhuanhuan',
						name: '家庭'
					},
					{
						icon: 'iconfont icon-qinzi',
						name: '亲子'
					},
				]

			}
		},

		onLoad(e) {
			this.id = e.id
			this.getinfo()
		},
		mounted() {
			uni.$on('getcover', (url) => {
				this.cover = url
			})
		},

		methods: {
			messageToggle(type, zxl) {
				this.msgType = type
				this.messageText = zxl
				this.$refs.message.open()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			async dialogConfirm() {
				let res = await this.$zxl('/deletexiangce', {
					id: this.id
				})
				if (res.data.status == 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: `删除成功😊`,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 2
						})
					}, 1000)
				}


			},
			cancel() {
				uni.navigateBack()
			},
			async save() {
				if (!this.type || !this.dsc || !this.name) {
					return
				} else {
					let res = await this.$zxl('/updatexiangce', {
						id: this.id,
						name: this.name,
						dsc: this.dsc,
						cover: this.cover,
						type: this.type
					}, 'POST')
					if (res.data.status == 200) {
						this.$refs.uToast.show({
							type: 'success',
							message: `编辑成功😊`,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							position: 'top'
						})
						uni.$emit('updatecover')
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							})
						}, 1000)
					}
				}
			},
			async getinfo() {
				let res = await this.$zxl('/getxiangceinfo', {
					id: this.id
				})
				console.log(res.data, '获取相册详情');
				if (res.data.status === 200) {
					let data = res.data.data[0];
					this.cover = data.cover ? data.cover : data.url
					this.name = data.name
					this.type = data.type
					this.dsc = data.dsc
					this.typename = data.type
				}
			},
			changetype(name) {
				this.typename = name
				this.type = name
			},
			toselect() {
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/qinglvkongjian/memory/coverselect/coverselect?id=${this.id}`
				})
			},
			async addphoto() {
				let res = await this.$zxl('/addxiangce', {
					name: this.name,
					dsc: this.dsc,
					type: this.type,
				}, 'POST')
				if (res.data.status == 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: `编辑成功😊`,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				}
			},
			async del() {
				this.dialogToggle('warn')
				console.log('删除')

			}
		}
	}
</script>

<style lang="less" scoped>
	.zxl {
		color: red;
	}

	.u-button,
	.u--textarea,
	.cover {
		width: 700rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
	}

	.cover {
		height: 80rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	input {
		width: 700rpx;
		margin: 0 auto;
		// padding: 10rpx;
		height: 50rpx;
		margin-top: 30rpx;
		// border-bottom: 1rpx solid darkgrey;
	}

	.u-collapse-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;

		.type {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;

			.iconfont {
				font-size: 80rpx;
				margin-bottom: 30rpx;
			}

		}

	}

	.header {
		width: 750rpx;
		height: 150rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));

		.headerson {
			width: 750rpx;
			height: 100rpx;
			box-sizing: border-box;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 30rpx;
			padding-right: 30rpx;
		}



		.title {
			position: absolute;
			width: auto;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>