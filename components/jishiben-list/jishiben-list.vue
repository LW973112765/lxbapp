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
						<input type="text" v-model="content" v-else :focus="true" @blur="save(item.id)">
						<view class="right">
							<image v-show="!isedit" src="../../static/images/note/bj.png" mode=""
								@click="update(item.content)"></image>
							</image>
							<image src="../../static/images/note/sc1.png" mode="" @click="del(item.id)"></image>
						</view>
					</view>
					<view class="buttom" v-if="!item.isover">
						创建于{{item.starttime}}
					</view>
					<view class="color" v-else>
						完成于{{item.endtime}}
					</view>
				</view>
			</view>
		</uni-transition>
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
			},
			type: {
				type: String,
				default: 'ing'
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
			del(id) {
				this.isshow = false
				setTimeout(() => {
					this.$emit('delete', id)
				}, 500)
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
		color: #333;
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
					color: #999;

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