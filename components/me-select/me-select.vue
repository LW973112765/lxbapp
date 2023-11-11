<template>
	<view class="me-select-item-wrap-box">
		<view class="me-select-item-wrap" v-for="(item, index) in data__list" :key="index">
			<view class="me-select-item-left" :class="{'scan': editModel}">
				<view @tap="itemTap(item, index)" @longpress="del(item)">
					<slot :slot-scope="{item: item, index:index}"></slot>
				</view>
				<image @tap="tap(index, false)" :class="{'up': editModel}" v-show="editModel && item.selection"
					class="select-icon" src="../../static/images/other/unselect.png" mode=""></image>
				<image @tap="tap(index, true)" :class="{'up': editModel}" v-show="editModel && !item.selection"
					class="select-icon" src="../../static/images/other/select.png" mode=""></image>
			</view>
		</view>
		<view class="bot-fixed-wrap" v-if="editModel && data__list.length > 0">
			<view v-if="selectArr.length < data__list.length" class="but" @tap="selectAll">全选</view>
			<view v-else class="but" @tap="unSelectAll">取消全选</view>
			<view @tap="finish" class="but" :class="{'danger': selectArr.length > 0, 'un':selectArr.length<=0 }">
				{{selectArr.length > 0 ? `删除(${selectArr.length})` : '删除'}}
			</view>
		</view>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="删除" title="确定要删除该条备忘录？"
					:content="content"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import meSelect from '@/components/me-select/me-select.vue'
	export default {
		components: {
			meSelect
		},
		data() {
			return {
				data__list: [],
				editModel: false,
				selectNum: 0,
				selectArr: [],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				content: ''
			}
		},
		props: {
			datalist: {
				type: Array,
				require: true
			},
			options: {
				type: Object,
				require: true
			},
		},
		watch: {
			datalist: {
				handler(n, o) {
					this.data__list = n
				},
				deep: true
			},
			data__list: {
				handler(n, o) {
					var selectNum = 0
					var tem = []
					if (this.data__list.length > 0) {
						this.data__list.forEach((item, index) => {
							item.selection && selectNum++
							if (this.options.flags.length <= 0) {
								item.selection && tem.push(item)
							} else {
								var tItem = {}
								this.options.flags.forEach((item2) => {
									tItem[item2] = item[item2]
								})
								tItem['index'] = index
								item.selection && tem.push(tItem)
							}
						})
					}
					this.selectArr = tem
					this.selectNum = selectNum
					this.$emit('change', this.selectArr)
				},
				deep: true
			}
		},
		created() {
			this.data__list = this.datalist
			console.log(this.data__list, 'this.data__list')
		},
		methods: {
			async del1(id) {
				let arr = []
				arr.push(id)
				let res = await this.$zxl('/delmemo', {
					arr
				})
				if (res.data.status == 200) {
					this.messageToggle('success')
					uni.$emit('freshbeiwanglu', '55')
				}
			},
			del(item) {
				this.content = item.content
				// this.dialogToggle('warn')
				uni.showModal({
					title: "确定要删除该条备忘录",
					content: this.$emojitwo(this.content),
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.del1(item.id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})

			},
			messageToggle(type) {
				this.msgType = type
				this.messageText = '删除成功'
				this.$refs.message.open()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},

			itemTap(item, index) {
				if (this.options.itemCanSelect && this.editModel) {
					this.data__list[index].selection = !this.data__list[index].selection
				}
				if (!this.editModel) {
					this.$emit('itemClick', item)
				}
			},
			changeModel() {
				this.editModel = !this.editModel
			},
			getSelectAll() {
				return this.selectArr
			},
			selectAll() {
				this.data__list.forEach((item, index) => {
					item.selection = true
				})
			},
			unSelectAll() {
				this.data__list.forEach((item, index) => {
					item.selection = false
				})
			},
			tap(index, value) {
				this.data__list[index].selection = value
			},
			finish() {
				if (this.selectArr.length <= 0) return
				this.$emit('finish', this.selectArr)
			}
		}

	}
</script>

<style scoped>
	.me-select-item-wrap-box {
		padding: 20upx;
		box-sizing: border-box;
	}

	.me-select-item-wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin: 20upx 0;
	}


	.me-select-item-left {
		min-height: 40upx;
		width: 100%;
		transition: width .1s linear;
	}

	.me-select-item-left .select-icon {
		height: 40upx;
		width: 40upx;
	}

	.me-select-item-left.scan {
		width: 80%;
	}

	.me-select-item-left .select-icon {
		position: absolute;
		left: 40upx;
		top: 50%;
		transform: translateY(-50%);
		z-index: -1;


	}

	.me-select-item-left .select-icon.up {
		z-index: 1;
	}

	.bot-fixed-wrap {
		position: fixed;
		background-color: #FFFFFF;
		display: flex;
		bottom: 0;
		left: 0;
		border-top: 1upx solid #999;
		width: 100%;
		height: 100upx;
		z-index: 99;
	}

	.but {
		line-height: 100upx;
		text-align: center;
		height: 100upx;
		width: 50%;
	}

	.but.un {
		color: #999999;
	}

	.but:first-child {
		border-right: 1upx solid #999;
	}

	.but.danger {
		color: red;
	}
</style>