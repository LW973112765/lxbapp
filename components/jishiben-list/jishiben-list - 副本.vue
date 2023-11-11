<template>
	<view class="list-box" :class="{'checked':item.isover}">
		<uni-transition :mode-class="isshow?['fade', 'slide-left']:['fade', 'slide-right']" :show="isshow"
			:duration="500">
			<view class="item">
				<view class="yuan" :class="{'tick':item.isover,'active':item.isover}" @click="edit(item.id)">
				</view>
				<view class="item-container">
					<view class="top">
						<view class="left" v-if="!isedit" :class="{'color':item.isover}">
							{{item.content}}
						</view>
						<!-- <input type="text" v-model="content" v-else :focus="true" @blur="isedit=!isedit"> -->
						<input type="text" v-model="content" v-else :focus="true" @blur="save(item.id)">
						<view class="right">
							<image v-show="!isedit" src="../../static/images/note/bj.png" mode=""
								@click="update(item.content)"></image>
							<!-- <image v-else src="../../static/images/note/save.png" mode="" @click="save(item.id)"> -->
							</image>
							<image src="../../static/images/note/sc1.png" mode="" @click="openModal(item)"></image>
						</view>
					</view>
					<view class="buttom" :class="{'color':item.isover}">
						{{item.time}}
					</view>

				</view>
			</view>
		</uni-transition>
		<uv-modal ref="modal" :content="tip" width="500rpx" :showCancelButton="true" :buttonReverse="true"
			@confirm="del"></uv-modal>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
			},
			threshold: {
				type: [Number],
				default: 50
			}
		},
		data() {
			return {
				modeClass: ['fade', 'slide-left'],
				isshow: true,
				tip: '',
				delid: null,
				isedit: false,
				content: ''
			}
		},
		methods: {
			update(content) {
				if (!this.isedit) {
					this.isedit = !this.isedit
					this.content = content
				}

			},
			save(id) {
				console.log(id)

				if (this.content.trim() == '') {
					this.isedit = !this.isedit
					return
				} else {
					uni.$emit('editnote', id, this.content)

				}
				this.isedit = !this.isedit

			},
			edit(id) {
				this.$emit('edit', id)
			},
			del() {
				this.isshow = false
				setTimeout(() => {
					this.$emit('delete', this.delid)
				}, 500)
			},
			openModal(item) {
				this.tip = `确定要删除【${item.content}】吗？`
				this.$refs.modal.open();
				this.delid = item.id

			},
		}
	}
</script>

<style lang="scss" scoped>
	.checked {
		opacity: 0.6;

	}

	.color {
		// color: red !important;
		// color: lightgreen !important;
		font-style: italic;
		text-decoration: line-through;
	}

	.list-box {
		border-radius: 15rpx;
		margin: 0 auto;


		.item {
			width: 100%;
			position: relative;
			margin-bottom: 20rpx;
			border-radius: 15rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item-container {
				flex: 1;
				height: 100%;
				position: relative;
				// background: -webkit-linear-gradient(top, pink, #999999);
				// background: -webkit-linear-gradient(right, white, rgb(66, 83, 216));
				background: -webkit-linear-gradient(right, white, aqua);
				// background-color: white;
				border-radius: 15rpx;
				box-sizing: border-box;
				padding: 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				// align-items: center;

				.top {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left {
						color: black;

					}

					.left,
					input {
						flex: 1
					}

					input {
						border: #999999 1px solid;
						border-radius: 5rpx;
						background-color: whitesmoke;
					}

					.right {
						display: flex;
						justify-content: space-between;
						align-items: center;

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}
				}

				.buttom {
					color: #333;

				}
			}

		}
	}

	.yuan {
		// position: absolute;
		width: 20px;
		height: 20px;
		position: relative;
		// top: 5rpx;
		// right: 5rpx;
		border: 1px solid #999 !important;
		z-index: 0;
		margin-right: 20rpx;
	}

	.active {
		background-color: blue;
	}

	.tick::after {
		content: " ";
		position: absolute;
		display: inline-block;
		width: 12px;
		height: 6px;
		border-width: 0 0 2px 2px;
		overflow: hidden;
		// border-color: limegreen;
		border-color: white;
		border-style: solid;
		-webkit-transform: rotate(-50deg);
		transform: rotate(-50deg);
		left: 3px;
		top: 4px;
		z-index: 0;
	}
</style>