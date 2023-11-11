<template>
	<view class="navbar">
		<view class="nav-left">
			<image  @click="navbarAction" class="menu-img" :src="img" mode="aspectFill"></image>
		</view>
		<view class="nav-middle" :class="{move:isedit}">
			<text class="title">{{title}}</text>
		</view>
		<view class="nav-right" v-if="isedit">
			<!-- <text class="title" :style="{color:select=='编辑'?' #ff875d':'lawngreen'}">{{select}}</text> -->
			<text class="title" @click="edit" v-if="select=='编辑'" style="color:#ff875d">{{select}}</text>
			<text class="title"  v-else style="color:green">{{select}}</text>
		</view>
		<view class="right" v-if="isadd">
		<image  @click="add" class="menu-img" :src="imgs" mode="aspectFill"></image>
		</view>
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
			select: {
				type: String,
				default () {
					return '';
				}
			},
			isedit: {
				type: Boolean,
				default () {
					return false;
				}
			},
			isadd: {
				type: Boolean,
				default () {
					return false;
				}
			},
			img: {
				type: String,
				default () {
					return '../../../static/images/choujiang/ax1.png';
				}
			},
			imgs: {
				type: String,
				default () {
					return '../../../static/images/choujiang/ax1.png';
				}
			}
		},
		methods: {
			navbarAction () {
				this.$emit('navbarBtnTap');
			},
			edit(){
				this.$emit('edit');
			},
			save(){
				this.$emit('save');
			},
			add(){
				this.$emit('add');
			}
			
		}
	}
</script>

<style lang="scss">
	.edit{
		color: #ff875d;
	}
	.save{
		color:lawngreen;
	}
	.move{
		margin-left: 40rpx;
	}
	.navbar {
		height: 70px;
		// background-color: #fff;
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
		.right {
			width: 10%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			image{
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
			width: 25%;
			display: flex;
			justify-content: center;
			align-items: center;
			.title {
				display: block;
				// background-color: red;
				font-size: 34upx;
				text-align: right;
				width: auto;
				margin-top: 15px;
				margin-right: -30rpx;
			}
		}
	}
</style>
