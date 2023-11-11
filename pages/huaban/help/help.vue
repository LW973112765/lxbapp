<template>
	<view class="help-container">
		<NavberMine @navbarBtnTap="navbarBtnTapHandler" :title="'使用帮助'"></NavberMine>
		<view v-for="(item, index) in helpList" :key="index" class="help-row">
			<view class="row-top">
				<image class="icon" :src="item.icon" mode="aspectFill"></image>
				<text class="title">{{item.title}}</text>
			</view>
			<view class="row-bottom">
				<text class=" desc">{{item.desc}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import NavberMine from '../../../components/navbar/navber-mine.vue'
	import {customPrint} from '../../../common/util/util.js'
	
	export default {
		components: {
			NavberMine
		},
		data () {
			return {
				helpList: [
					{
						title: '画笔',
						icon: '../../../static/png/tool_pen_s.png',
						desc: '使用画笔功能，可以直接在画板上进行画画，用户可以拖动画笔滑块调节画笔宽度。'
					}, {
						title: '颜色',
						icon: '../../../static/png/tool_color_s.png',
						desc: '使用颜色功能，可以选择画笔颜色，用户可以使用选择的颜色来进行绘制。'
					}, {
						title: '橡皮',
						icon: '../../../static/png/tool_eraser_s.png',
						desc: '使用橡皮功能，可以直接在画板上擦除相关的绘制轨迹。'
					}, {
						title: '清空',
						icon: '../../../static/png/tool_clear_s.png',
						desc: '使用清空功能，可以清除绘制轨迹并重置画板。'
					}, {
						title: '撤销',
						icon: '../../../static/png/cx11.png',
						desc: '使用撤销功能，可以清除上一条绘制轨迹。'
					}, {
						title: '保存',
						icon: '../../../static/png/tool_download_s.png',
						desc: '使用保存功能，可以直接将绘制在画板上的轨迹保存到相册。'
					}, {
						title: '矩形',
						icon: '../../../static/png/tool_rect_s.png',
						desc: '使用矩形功能，可以直接绘制空心或者实体矩形。'
					}, {
						title: '圆形',
						icon: '../../../static/png/tool_circle_s.png',
						desc: '使用圆形功能，可以直接绘制空心或者实体圆形。'
					}, {
						title: '背景',
						icon: '../../../static/png/bj2.png',
						desc: '使用背景功能，可以直接更改画板背景颜色。'
					}
				]
			}
		},
		methods: {
			navbarBtnTapHandler () {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.help-container {
		height: 100%;
		background-color: #fff;
		
		.help-row {
			padding: 0 20upx;
			
			.row-top {
				margin-top: 20upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				.icon {
					width: 30upx;
					height: 30upx;
				}
				
				.title {
					font-size: $uni-font-size-lg;
					color: $uni-theme-color;
					margin-left: 20upx;
				}
			}
			
			.row-bottom {
				margin-top: 10upx;
				
				.desc {
					font-size: $uni-font-size-base;
					line-height: 35upx;
				}
			}
		}
	}
</style>
