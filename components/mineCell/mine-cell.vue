<template>
	<view @click="mineCellAction" class="mine-cell">
		<view class="cell-left">
			<image class="icon" :src="mineObj.icon" mode="aspectFill"></image>
		</view>
		<view class="cell-middle">
			<text class="title">{{mineObj.title}}</text>
		</view>
		<view class="cell-right">
			<image class="arrow" src="../../../static/png/mine_arrow.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mineObj: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data () {
			return {}
		},
		methods: {
			mineCellAction () {
				this.$emit('mineCellTap', this.mineObj);
			}
		}
	}
</script>

<style lang="scss">
	.mine-cell {
		display: flex;
		padding: 30upx 0;
		// border-bottom: 1upx $uni-border-color solid;
		position: relative;
		
		&:after{
			content: '';
			position: absolute;
			left: 30upx;
			right: 30upx;
			bottom: 0;
			height: 0;
			border-bottom: 1px solid $uni-border-color;
			transform: scaleY(50%);
		}
		
		.cell-left {
			width: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.icon {
				width: 30upx;
				height: 30upx;
			}
		}
		
		.cell-middle {
			width: 70%;
			
			.title {
				font-size: $uni-font-size-base;
			}
		}
		
		.cell-right {
			width: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.arrow {
				width: 30upx;
				height: 30upx;
			}
		}
	}
</style>
