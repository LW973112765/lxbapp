<template>
	<view>
		<view class="hero">
			<view class="item" v-for="(item,id) in herolist" :key="item.id">
				<!-- <image :src="`${img}/1681525471892mmexport1601637147773.jpg`" mode=""></image> -->
				<image :src="`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`"
					mode=""></image>
				<text>
					{{item.cname}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				herolist: [],
				img: "http://lwandzxl.top"
			};
		},
		methods: {
			async gethero() {
				let res = await this.$zxl('/gethero')
				if (res.data.status === 200) {
					console.log(res.data);
					this.herolist = res.data.data
				}

			},
		},
		created() {
			this.gethero()
		},
	}
</script>

<style lang="scss" scoped>
	.hero {
		width: 700rpx;
		margin: 0 auto;
		height: auto;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		display: grid;
		grid-template-columns: repeat(6, 100rpx);
		grid-gap: 15rpx;
		// align-items: center;
		justify-items: center;
		justify-content: center;
		// align-content: center;
		grid-template-rows: repeat(auto, 300rpx);

		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 20rpx;

			image {
				width: 100rpx;
				height: 100rpx;
				border-top-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
			}
		}
	}
</style>