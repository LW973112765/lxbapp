<template>
	<view>
		<view class="header">
			<scroll-view class="headerson" enable-flex scroll-x>
				<view class="box" v-for="(item,index) in type" :key="index" @click="changetype(item.value)">
					<view class="top">
						<view class="select" v-show="item.value==selecttype">

						</view>
					</view>
					<view class="bottom">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="hero">
			<view class="item" v-for="(item,id) in herolist" :key="item.id" @click="toinfo(item)">
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
				data: [],
				img: "http://lwandzxl.top",
				selecttype: 0,
				type: [{
						name: "全部",
						value: 0
					},
					{
						name: "坦克",
						value: 3
					},
					{
						name: "战士",
						value: 1
					}, {
						name: "刺客",
						value: 4
					}, {
						name: "法师",
						value: 2
					}, {
						name: "射手",
						value: 5
					}, {
						name: "辅助",
						value: 6
					},
				]
			};
		},
		methods: {
			changetype(value) {
				this.selecttype = value
				if (value) {
					this.herolist = this.data.filter(i => i.hero_type == value || i.hero_type2 == value)
				} else {
					this.herolist = this.data
				}
			},
			async gethero() {
				let res = await this.$zxl('/gethero')
				if (res.data.status === 200) {
					console.log(res.data);
					this.data = res.data.data
					this.herolist = res.data.data
				}

			},
			toinfo(item) {
				uni.navigateTo({
					url: `/pages/heros/heroinfo/heroinfo?data=${JSON.stringify(item)}`,
					animationType: 'zoom-fade-out'
				})
			}
		},
		created() {
			this.gethero()
		},
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 80rpx;
		// margin-bottom: 10rpx;
		padding-top: 20rpx;

		.headerson {
			// width: 100%;
			// height: 150rpx;
			padding-left: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			white-space: nowrap;

			.box {
				width: 120rpx;
				height: 80rpx;
				display: flex;
				display: inline-block;
				margin-right: 80rpx;
				justify-content: start;
				align-items: center;
				align-content: center;

				.bottom {
					display: block;
					float: right;
					width: 40rpx;
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;

				}

				.top {
					float: left;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					border: 1rpx solid lightgrey;
					display: block;
					display: flex;
					justify-content: center;
					align-items: center;

					.select {
						display: block;
						width: 25rpx;
						height: 25rpx;
						background-color: greenyellow;
						border-radius: 50%;

					}
				}
			}
		}
	}

	.hero {
		width: 700rpx;
		margin: 0 auto;
		height: auto;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		display: grid;
		grid-template-columns: repeat(5, 130rpx);
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
			font-size: 25rpx;

			text {
				width: 130rpx;
				display: block;
				white-space: nowrap;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			image {
				width: 130rpx;
				height: 130rpx;
				border-top-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
			}
		}
	}
</style>