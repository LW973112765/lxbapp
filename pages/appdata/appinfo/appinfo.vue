<template>
	<view class="main">
		<view class="zxl">
			<image src="./img/4.png" mode=""></image>
			<view class="right">
				<text>实时用户</text>
				<text class="data">{{user}}人</text>
			</view>
		</view>
		<view class="zxl">
			<image src="./img/2.png" mode=""></image>
			<view class="right">
				<text>总访问量</text>
				<text class="data">{{view}}次</text>
			</view>
		</view>
		<view class="zxl">
			<image src="./img/1.png" mode=""></image>
			<view class="right">
				<text>发布文章</text>
				<text class="data">{{article}}篇</text>
			</view>
		</view>
		<view class="zxl">
			<image src="./img/3.png" mode=""></image>
			<view class="right">
				<text>评论总数</text>
				<text class="data">{{comment}}条</text>
			</view>
		</view>
		<view class="zxl">
			<image src="./img/6.png" mode=""></image>
			<view class="right">
				<text>甜蜜时光</text>
				<text class="data">{{comment}}次</text>
			</view>
		</view>
		<view class="zxl">
			<image src="./img/5.png" mode=""></image>
			<view class="right">
				<text>纪念日</text>
				<text class="data">{{jinianri}}个</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: 0,
				view: 0,
				comment: 0,
				article: 0,
				jinianri: 0,
				diandiandidi: 0
			}
		},
		created() {
			this.getuser()
			this.getarticle()
			this.getcomment()
			this.getjinianri()
			this.getdiandiandidi()
		},
		methods: {
			async getuser() {
				let res = await this.$zxl('/userlist')
				if (res.data.status == 200)
					this.user = res.data.total
			},
			async getarticle() {
				let res = await this.$zxl('/getarticletotal', {
					status: 0
				})
				if (res.data.status == 200) {
					res.data.data.forEach((ele) => {
						this.view += Number(ele.total);
					});
					this.article = res.data.data.length;
				}
			},
			async getcomment() {
				let res = await this.$zxl('/getallcomment')
				if (res.data.status == 200)
					this.comment = res.data.total;
			},
			async getjinianri() {
				let res = await this.$zxl('/getjinianri')
				if (res.data.status == 200)
					this.jinianri = res.data.total;
			},
			async getdiandiandidi() {
				let res = await this.$zxl('/getdiandiandidi')
				if (res.data.status == 200)
					this.diandiandidi = res.data.total;
			},
		}
	}
</script>

<style lang="less" scoped>
	.main {
		width: 100%;
		padding-bottom: 30rpx;
	}

	.data {
		color: red;

	}

	.zxl {
		width: 500rpx;
		height: 200rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 15rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		padding: 30rpx;
		align-items: center;
		background: linear-gradient(45deg, blue, aqua);
	}

	image {
		width: 150rpx;
		height: 150rpx;
	}

	.right {
		width: 150rpx;
		height: 150rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 30rpx;
		align-items: center;
	}
</style>