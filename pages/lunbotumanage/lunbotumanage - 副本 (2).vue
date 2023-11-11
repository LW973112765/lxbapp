<template>
	<view>
		<view class="main">
			<cover-list :list="data" :threshold="threshold" @del="deletecover" @edit="edit">
				<template slot-scope="{item ,index}">
					<view class="recentItem">
						<p class="common-label" v-show="item.isused">
							使用中<span class="triangle" />
						</p>
						<image :src="item.url" mode=""></image>
					</view>
				</template>
			</cover-list>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import moment from 'moment'
	export default {
		data() {
			return {
				threshold: 50,
				userid: null,
				data: []
			};
		},
		onLoad() {
			this.userid = this.userinfo.id
			this.getcover()
		},
		mounted() {
			uni.$on('getremoveid', (msg) => {
				this.getcover()
			})
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: `/pages/lunbotuupload/lunbotuupload?id=${this.userinfo.id}`,
				animationType: 'zoom-fade-out'
			})
		},
		methods: {
			async edit(id, isused) {
				let status
				if (isused) {
					status = 0
				} else {
					status = 1
				}
				console.log(status)
				let res = await this.$zxl('/updatecover', {
					isused: status,
					time: moment().valueOf(),
					id
				}, 'POST')
				if (res.data.status == 200) {
					this.getcover()
				}
			},
			async deletecover(id, isused) {
				if (isused) {
					return;
				} else {
					await this.$zxl('/deletecover', {
						id
					})
					this.getcover(this.userid)
				}

			},
			async getcover() {
				let res = await this.$zxl('/getcover', {
					userid: this.userid
				})
				if (res.data.status == 200) {
					console.log(res.data.data, '封面')
					this.data = res.data.data
				} else {
					this.data = []
				}
			},
		}

	}
</script>

<style lang="less" scoped>
	.common-label {
		position: absolute;
		width: 100rpx;
		height: 24px;
		line-height: 24px;
		text-align: center;
		color: #fff;
		background-color: limegreen;
		top: 10px;
		left: -10px;
		z-index: 9;

		.triangle {
			position: absolute;
			top: 24px;
			left: -10px;
			width: 0;
			height: 0;
			z-index: 33;
			border-left: 10px solid transparent;
			border-right: 10px solid limegreen;
			border-bottom: 7px solid transparent;
		}
	}

	.recentItem {
		position: relative;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
		display: flex;
		width: 700rpx;
		flex-wrap: wrap;
		box-sizing: border-box;
		height: auto;
		background: -webkit-linear-gradient(top, pink, #999999);
		padding: 20rpx;

		image {
			width: 700rpx;
			height: 300rpx;
			border-radius: 10rpx;
		}

		.delete {
			position: absolute;
			border-radius: 20rpx;
			top: 0;
			right: -130rpx;
			width: 100rpx;
			height: 100%;
			text-align: center;
			color: #333;
			font-size: 35rpx;
			background-color: red;

			view {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}

	}
</style>