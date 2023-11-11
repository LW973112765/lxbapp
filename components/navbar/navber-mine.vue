<template>
	<view class="navbar">
		<view class="nav-left">
			<image v-if="showBack" @click="navbarAction" class="menu-img" src="../../static/png/navbar_back.png" mode="aspectFill"></image>
		</view>
		<view class="nav-middle">
			<text class="title">{{title}}</text>
		</view>
		<view class="nav-right"></view>
	</view>
</template>

<script>
	export default  {
		props: {
			title: {
				type: String,
				default () {
					return '关于';
				}
			},
			showBack: {
				type: Boolean,
				default () {
					return true;
				}
			}
		},
		methods: {
			navbarAction () {
				this.$emit('navbarBtnTap');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		height: 70px;
		background-color: #fff;
		display: flex;
		// border-bottom: 1upx $uni-border-color solid;
		
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
			width: 80%;
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
			width: 10%;
		}
	}
</style>
