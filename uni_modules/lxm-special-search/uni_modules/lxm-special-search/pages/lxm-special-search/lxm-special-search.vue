<template>
	<view class="u-page">
		<view class="u-page__item">
			<u-navbar height="70px" fixed>
				<view class="u-nav-slot"slot="left">
					<u-icon name="search" size="24"color="black"></u-icon>
					<view class="u-demo-block">
						<view class="u-demo-block__content">
							<u-notice-bar color="black" bgColor="transparent" :text="text4" direction="column" icon=""></u-notice-bar>
						</view>
					</view>
					<u-icon name="camera" size="24"color="black"></u-icon>
					<u-line direction="column" :hairline="false" length="16" margin="0 8px" color="white" ></u-line>
					<u-icon name="mic" size="24"color="black"></u-icon>
				</view>
			</u-navbar>
		</view>
		<u-gap marginTop="20"bgColor="#f3f4f6" height="50"></u-gap>
		<view class="u-demo-block">
			<view class="u-demo-block__content1">
				<u-tabs :list="list1" >
					<view slot="left" style="padding-left: 4px;" @tap="$u.toast('插槽被点击')">
						<u-icon name="list" size="21" bold></u-icon>
					</view>
				</u-tabs>
			</view>
		</view>
		<view class="u-page__gap-item">
			<u-gap bgColor="#f3f4f6" height="10px"></u-gap>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text4: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				list1: [{
						name: '推荐',
					}, {
						name: '年货',
					}, {
						name: '食品',
						badge: {
							isDot: true
						}
					}, {
						name: '电器',
						badge: {
							value: 5,
						}
					},
					{
						name: '男装'
					}, {
						name: '女装'
					}, {
						name: '百货'
					}, {
						name: '运动'
					}, {
						name: '鞋包'
					}, {
						name: '内衣'
					}, {
						name: '手机'
					}
				],
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			rightClick() {
				console.log('rightClick');
			},
			leftClick() {
				console.log('leftClick');
			}
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	page {
		background-color: white;
	}

	/* #endif */

	.u-page {
		padding: 0;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: $u-primary;
					font-size: 14px;
				}
			}
		}
	}

	.u-nav-slot {
		@include flex;
		align-items: center;
		justify-content: space-between;
		border: 1.4px;
		border-color:#0000ff ;
		border-style: solid;
		border-radius: 8px;
		background-color:transprent ;
		padding: 3px 3px;
		width:680rpx
		
	
	}

	
    .u-demo-block__content {
    	@include flex(column);
    	
    	width: 480rpx;
    }
	.u-demo-block__content1 {
		@include flex(column);
		margin: 0px 12px;
		width: 680rpx;
		bgColor:white;
	}
</style>
