<template>
	<view class="list-box">
		<view v-for="(item,index) in dataList" :key="item.id" class="item" style="height: auto;" @tap=" tap(item)"
			@touchstart="touchstart(item,$event)" @touchmove="touchmove" @touchend="touchend()">
			<view class="option-box" @click="del(item.id)">
				删除
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
			del(id) {
				this.$emit('del', id)
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
				background-color: indianred;
				border-radius: 20rpx;
				// padding: 20rpx;
				width: 100rpx;
				top: 0;
				right: 0;
				bottom: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #000;
				;
			}
		}
	}
</style>