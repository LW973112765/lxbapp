<template>
	<view class="navbar">
		<view class="nav-left">
			<image v-if="showBack" @click="navbarAction" class="menu-img" src="../../static/png/navbar_back.png" mode="aspectFill"></image>
		</view>
		<view class="nav-middle">
			<text class="title">{{title}}</text>
		</view>
		<view class="nav-right">
			<image @click="download" src="../../static/png/xz.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default  {
		props: {
			showBack: {
				type: Boolean,
				default () {
					return true;
				}
			},
			title: {
				type: String,
				default () {
					return '极简画板';
				}
			},
			Strokes: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		methods: {
			navbarAction () {
				this.$emit('navbarBtnTap');
			},
			download () {
				this.$emit('download');
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		width: 750rpx;
		height: 70px;
		background-color: #fff;
		display: flex;
		// border-bottom: 1upx $uni-border-color solid;
		flex-wrap: nowrap;
		
		.nav-left {
			width: 10%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.menu-img {
				width: 40upx;
				height: 40upx;
				margin-top: 15px;
			}
		}
		
		.nav-middle {
			// background-color: red;
			// margin: 0 30rpx;
			margin-left: 40rpx;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			.title {
				color: #ff875d;
				font-size: 34upx;
				margin-top: 15px;
			}
		}
		
		.nav-right {
			width: 15%;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			// padding: 30rpx;
			image {
				width: 40upx;
				height: 40upx;
				margin-top: 15px;
			}
		}
	}
</style>
