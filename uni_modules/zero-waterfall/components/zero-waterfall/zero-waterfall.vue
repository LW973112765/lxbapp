<template>
	<view class="container">
		<view class="waterfall_left">
			<view class="waterfall_item" v-for="(item,index) in listLeft" :key="index">
				<view class="item_img">
					<!-- <image :src="item.url" mode="widthFix" @load="considerPush"></image> -->
					<zero-lazy-load @click="yulan(index)" :image="item.url" :imgMode='imgMode' @load='considerPush'
						@error='considerPush'>
					</zero-lazy-load>
				</view>
				<view class="item_info" v-if="item.title">
					<view class="item_info_title" style="padding-left: 15rpx;box-sizing: border-box;" v-if="item.title">
						{{item.title}}</view>
					<view class="item_info_note" v-if="item.title">{{item.note}}</view>
					<!--  #ifdef  MP-WEIXIN -->
					<slot name="slot{{item.id}}" />
					<!--  #endif -->

					<!-- #ifndef  MP-WEIXIN -->
					<slot v-bind="item" />
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="waterfall_right">
			<view class="waterfall_item" v-for="(item,index) in listRight" :key="index">
				<view class="item_img">
					<!-- <image :src="item.url" mode="widthFix" @load="considerPush"></image> -->
					<zero-lazy-load @click="yulan2(index)" :image="item.url" :imgMode='imgMode' @load='considerPush'
						@error='considerPush'>
					</zero-lazy-load>
				</view>
				<view class="item_info" v-if="item.title">
					<view class="item_info_title" style="padding-left: 15rpx;box-sizing: border-box;" v-if="item.title">
						{{item.title}}</view>
					<view class="item_info_note" v-if="item.title">{{item.note}}</view>
					<!--  #ifdef  MP-WEIXIN -->
					<slot name="slot{{item.id}}" />
					<!--  #endif -->

					<!-- #ifndef  MP-WEIXIN -->
					<slot v-bind="item" />
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		name: "zero-waterfall",
		props: {
			// 需要在使用页面 onPageScroll 传进来
			list: {
				type: Array,
				required: true,
				default: []
			},
			// 图片裁剪模式
			imgMode: {
				type: String,
				default: 'widthFix'
			},
		},
		data() {
			return {
				listLeft: [],
				listRight: [],
				newList: [],
			}
		},
		watch: {
			list(newValue, oldValue) {
				this.newList = newValue.slice(oldValue.length);
				this.considerPush()
			},
		},
		mounted() {
			this.init()
		},

		methods: {
			yulan(index) {
				console.log('yulan')
				uni.navigateTo({
					url: '/pages/showimg/showimg?imgs=' + JSON.stringify(this.listLeft) + '&current=' + index,
					animationType: "fade-in",
				})
			},
			yulan2(index) {
				console.log('yulan')
				uni.navigateTo({
					url: '/pages/showimg/showimg?imgs=' + JSON.stringify(this.listRight) + '&current=' + index,
					animationType: "fade-in",
				})
			},
			// 触发重新排列
			init() {
				this.newList = [...this.list];
				this.listLeft = [];
				this.listRight = [];
				if (this.newList.length != 0) {
					this.listLeft.push(this.newList.shift()); //触发排列
					// this.listRight.push(this.newList[1]); //触发排列
				}

			},
			// 清空数据列表
			clear() {
				this.listLeft = [];
				this.listRight = [];
				// 同时清除父组件列表中的数据
				this.$emit('clear', []);
				this.newList = [];
			},

			// 计算排列
			considerPush() {
				if (this.newList.length == 0) return; //没有数据了
				let leftH = 0,
					rightH = 0; //左右高度
				var query = uni.createSelectorQuery().in(this);

				query.selectAll('.waterfall_left').boundingClientRect()
				query.selectAll('.waterfall_right').boundingClientRect()
				query.exec(res => {
					// console.log('结果',res)
					leftH = res[0].length != 0 ? res[0][0].height : 0; //防止查询不到做个处理
					rightH = res[1].length != 0 ? res[1][0].height : 0;
					// console.log('结果',leftH,rightH)
					if (leftH == rightH || leftH < rightH) {
						// 相等 || 左边小  
						this.listLeft.push(this.newList.shift());
					} else {
						// 右边小
						this.listRight.push(this.newList.shift());
					}
				});

			},

		}

	}
</script>
<style lang="scss" scoped>
	.container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: flex-start;
	}

	.waterfall_left,
	.waterfall_right {
		width: 46%;
	}

	.waterfall_item {
		width: 100%;
		margin: 10rpx 0 40rpx 0;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		overflow: hidden;

		.item_img {
			width: 100%;

			image {
				width: 100%;
				overflow: hidden;
			}
		}

		.item_info {
			padding: 10rpx 0;

			.item_info_title {
				color: #333333;
				font-size: 32rpx;
				padding: 10rpx 0;
			}

			.item_info_note {
				color: #666666;
				font-size: 28rpx;
			}
		}

	}
</style>