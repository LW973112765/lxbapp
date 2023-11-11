<template>
	<view>
		<input type="text" v-model="name" placeholder="添加相册名称">
		<u--textarea v-model="dsc" placeholder="添加相册描述" autoHeight maxlength=30></u--textarea>
		<u-collapse><u-collapse-item title="主题">
				<text slot="value" class="u-page__item__title__slot-title">{{typename}}</text>
				<view class="u-collapse-content">
					<view class="type" v-for="(item,index) in typenames" :key="index" @click="changetype(item.name)">
						<text :class="item.icon" :style="{color:item.name==typename?'aqua':''}"></text>
						<text>{{item.name}}</text>
					</view>
				</view>
			</u-collapse-item></u-collapse>
		<u-button type="primary" text="完成创建" @click="send"></u-button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typename: '请选择',
				name: '',
				dsc: '',
				type: '',
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
		methods: {
			changetype(name) {
				this.typename = name
				this.type = name
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
						message: `相册[${this.name}]添加成功😊`,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				}
			},
			send() {
				if (!this.name) {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请输入相册名称😊",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
				} else if (!this.dsc) {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请输入相册描述😊",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})

				} else if (!this.type) {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请选择相册主题😊",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
				} else {
					this.addphoto()
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.zxl {
		color: red;
	}

	.u-button,
	.u--textarea {
		width: 700rpx;
		margin-top: 30rpx;
	}

	input {
		width: 700rpx;
		margin: 0 auto;
		padding: 10rpx;
		height: 50rpx;
		margin-top: 30rpx;
		border-bottom: 1rpx solid darkgrey;
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
</style>