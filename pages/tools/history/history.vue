<template>
	<view>
		<scroll-view scroll-y class="recentScroll" enable-flex>
			<view class="recentItem" v-for="(item,id) in comment" :key="item.id">
				<view class="info">
					{{item.year}}&nbsp;&nbsp;年
				</view>
				<view class="">
					<text class="comment">{{item.title}}</text><text class="content" v-html="item.desc"></text>
				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comment: []
			};
		},
		onLoad() {
			this.getcomment()
		},
		methods: {
			async getcomment() {
				let res = await this.$lw('https://api.oioweb.cn/api/common/history')
				console.log(res)
				this.comment = res.data.result
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recentScroll {
		display: flex;
		padding-top: 20rpx;
		width: 100%;
	}

	.recentItem .content {
		width: 100%;
		margin-top: 20rpx;
		font-size: 27rpx;
		color: yellow;
		display: block;
	}

	.recentItem {
		// transition: transform 0.1s;
		position: relative;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
		display: flex;
		width: 90%;
		flex-wrap: wrap;
		// height: 200rpx;
		height: auto;
		// background-color: lightgray;
		background: -webkit-linear-gradient(top, pink, #999999);
		padding: 20rpx;

		.info {
			margin-bottom: 20rpx;
		}

		.recentItem .comment {
			margin-top: 20rpx;
		}
	}
</style>