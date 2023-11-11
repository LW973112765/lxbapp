<template>
	<view class="list-box">
		<view v-for="(item,index) in dataList" :key="item.id" class="item" style="height: auto;" @tap=" tap(item)"
			@touchstart="touchstart(item,$event)" @touchmove="touchmove" @touchend="touchend()">
			<view class="option-box">
				<view class="box1">
					<view class="yuan" :class="{'tick':item.isused}" @click="edit(item.id,item.isused)"></view>
				</view>
				<view class="box2" :class="{'active':item.isused}" @click="del(item.id,item.isused)">
					删除
				</view>
			</view>
			<view class="item-container" :style="{ 
					transform: item.transformVal,transition: item.transitionVal }">
				<slot :item="item" :index="index"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => ([])
			},
			itemHeight: {
				type: [Number],
				default: 120
			},
			options: {
				type: Array,
				default: () => ([])
			},
			threshold: {
				type: [Number],
				default: 50
			}
		},
		data() {
			return {
				dataList: [],
				dragTargetX: 0,
				offsetWidth: 0,
				activeItem: null,
				translateX: 0,
			}
		},
		watch: {
			list: {
				immediate: true,
				deep: true,
				handler(list) {
					this.setList(list)
				}
			}
		},
		methods: {
			del(id, isused) {
				this.$emit('del', id, isused)
			},
			edit(id, isused) {
				this.$emit('edit', id, isused)
			},
			touchstart(item, e) {
				if (this.translateX != 0 && this.activeItem.item_id != item.item_id) {
					this.tap();
				}
				this.dragTargetX = e.touches[0].pageX;
				this.activeItem = item;
				if (!this.offsetWidth) {
					const res = uni.getSystemInfoSync();
					let screenWidth = res.screenWidth;
					this.offsetWidth = 80;
					// this.options.forEach(item => {
					// 	this.offsetWidth += screenWidth / 750 * item.width;
					// })

				}
			},
			touchmove(e) {
				let newX = e.touches[0].pageX;
				let d = newX - this.dragTargetX;

				if ((this.translateX < -this.offsetWidth && d < 0) || (this.translateX > 0 && d > 0)) {
					if (this.translateX > 0) {
						d = d * 1 / this.translateX;
					} else {
						d = d * 1 / (Math.abs(this.translateX) - this.offsetWidth);
					}
				}

				this.translateX += d;
				this.setBounceTransition(true);

				this.dragTargetX = newX;
			},
			touchend() {
				if (this.translateX >= 0 || Math.abs(this.translateX) < this.threshold) {
					this.translateX = 0;
					this.setBounceTransition();
				} else {
					this.translateX = -this.offsetWidth;
					this.setBounceTransition();
				}
			},
			tap(item) {
				this.translateX = 0;
				this.setBounceTransition();
				this.$emit('click', item)
			},
			setBounceTransition(flag) {
				if (flag) {
					this.activeItem.transitionVal = 'none';
				} else {
					this.activeItem.transitionVal = 'all 0.4s cubic-bezier(.62,1.69,.7,1)';
				}
				this.activeItem.transformVal = 'translateX(' + this.translateX + 'px)';
			},
			setList(list) {
				this.dataList = [];
				this.dataList = list.map((item, index) => {
					return {
						...item,
						transformVal: '',
						transitionVal: '',
						item_id: index
					}
				})
			},
			optionClick(item, oitem) {
				this.translateX = 0;
				this.setBounceTransition();
				this.$emit("optionClick", item, oitem);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		background-color: #999999 !important;
		opacity: 0.5 !important;
	}

	.list-box {
		// width: 100%;
		// background: -webkit-linear-gradient(top, pink, #999999);
		width: 720rpx;
		border-radius: 15rpx;
		margin: 0 auto;

		.item {
			width: 100%;
			// border-bottom: 1rpx solid #F5F5F5;
			position: relative;
			margin-bottom: 20rpx;
			border-radius: 15rpx;
			// background: -webkit-linear-gradient(top, pink, #999999);

			.item-container {
				width: 100%;
				height: 100%;
				position: relative;
				background: -webkit-linear-gradient(top, pink, #999999);
				border-radius: 15rpx;
				// transition: all 0.3s cubic-bezier(.34,1.06,.78,1.1);
			}

			.option-box {
				position: absolute;
				box-sizing: border-box;
				border-radius: 20rpx;
				padding: 0 20rpx;
				width: 180rpx;
				top: 0;
				right: 0;
				bottom: 0;

				color: #000;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.box2 {
					background-color: indianred;
					width: 80rpx;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 20rpx;
				}
			}
		}
	}

	.yuan {
		width: 20px;
		position: relative;
		height: 20px;
		border: 1px solid #999 !important;
		z-index: 0;
	}

	.tick::after {
		content: " ";
		position: absolute;
		display: inline-block;
		width: 12px;
		height: 6px;
		border-width: 0 0 2px 2px;
		overflow: hidden;
		border-color: limegreen;
		border-style: solid;
		-webkit-transform: rotate(-50deg);
		transform: rotate(-50deg);
		left: 3px;
		top: 4px;
		z-index: 0;
	}
</style>