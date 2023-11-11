<template>
	<view class="main">
		<view class="article" v-if="article.length>0">
			<ArticleItem :article="article" v-for="(item, id) in article" :key="item.id" :item="item" />
		</view>
		<view v-else>
			<view class="nocontent">
				无内容
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<view class="uni-pagination-box" v-if="article.length>0">
			<wyb-pagination :total-items="total" :current="currentPage" :page-items="pageSize" @change="changePage" />
		</view>
		<view class="count" v-show="isshow">
			<view style="height: 60rpx;" v-for="(item,index) in count" :key="index " @click="changecount(item.value)">
				{{item.value}}
			</view>
		</view>
	</view>

</template>
<script>
	import moment from "moment";
	import {
		mapState
	} from "vuex";
	export default {
		name: "Article",
		data() {
			return {
				article: [],
				total: 0,
				pageSize: 8,
				triggered: false,
				currentPage: 1,
				isshow: false,
				count: [{
						value: 4
					},
					{
						value: 8
					},
					{
						value: 10
					},
					{
						value: 20
					},
					{
						value: 50
					},
				]
			};
		},
		onPullDownRefresh() {
			this.fresh()

		},
		onLoad() {
			var webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewButtonStyle(0, {
				text: this.pageSize + '条'
			});
		},
		onNavigationBarButtonTap(e) {
			this.isshow = !this.isshow
		},
		methods: {
			changecount(num) {
				console.log(num, '收到')
				this.pageSize = num
				this.http(1, this.userinfo.id, this.pageSize)
				this.isshow = false
				var webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(0, {
					text: this.pageSize + '条'
				});
			},
			changePage(num) {
				console.log(num, '收到')
				this.http(num.current, this.userinfo.id, this.pageSize)
			},
			//下拉刷新
			fresh() {
				console.log('下拉')
				this.triggered = true
				this.http(this.currentPage, this.userinfo.id, this.pageSize)
				setTimeout(() => {
					uni.stopPullDownRefresh()
					this.$refs.uToast.show({
						type: 'success',
						message: "刷新成功！",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					// this.currentPage = 1
				}, 1000)
			},
			// 获取文章列表
			async http(page, userid, pageSize) {
				// console.log("收到了", page);
				let res = await this.$zxl('/getcollectarticle', {
					userid,
					page,
					pageSize

				})
				console.log(res.data);
				this.currentPage = page;
				if (res.data.status === 200) {
					console.log(res.data.data);
					res.data.data.forEach((data) => {
						// data.avatar = data.avatar.slice(7);
						data.tag = data.tag.split(",").map((item) => item * 1);
						data.created_at = moment(data.created_at).format(
							"YYYY-MM-DD HH:mm:ss"
						);
					});
					this.article = res.data.data;
					this.triggered = false
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
				} else {
					this.currentPage--
					if (this.currentPage <= 0) {
						this.currentPage = 0
						this.article = []
						this.total = 0;
						this.pageSize = 0;
					} else {
						this.http(this.currentPage, this.userinfo.id, this.pageSize)
					}

				}

			},
		},
		created() {
			this.http(1, this.userinfo.id, this.pageSize);
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
	};
</script>

<style lang="less" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.nocontent {
		width: 700rpx;
		height: 500rpx;
		border-radius: 10rpx;
		background-color: #999;
		text-align: center;
		line-height: 500rpx;
		font-size: 50rpx;
		margin: 0 auto;
	}

	.main {
		padding-top: 30rpx;
	}

	.article {
		width: 100%;
		height: auto;
	}

	.pagination-wrapper {
		width: 95%;
		background-color: #fff;
	}

	.navScroll {
		display: flex;
		white-space: nowrap;
		height: 60rpx;
		margin-bottom: 20rpx
	}


	.navScroll .navItem {
		padding: 0 30rpx;
		font-size: 35rpx;
		height: 60rpx;
		line-height: 60rpx;
		display: inline-block;
		transition: all 0.5s;
	}

	.navScroll view {
		height: 60rpx;
		box-sizing: border-box;
	}


	.navItem .active {
		border-bottom: 1rpx solid #d43c33;
		color: #d43c33;
	}

	.uni-pagination-box {
		height: 100rpx;
		margin-top: 20rpx;
	}

	.count {
		width: 200rpx;
		height: auto;
		background-color: whitesmoke;
		position: fixed;
		top: 20rpx;
		right: 30rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.count::after {
		content: '';
		position: absolute;
		border-top: 20rpx solid transparent;
		border-bottom: 20rpx solid whitesmoke;
		border-left: 20rpx solid transparent;
		border-right: 20rpx solid transparent;
		top: -35rpx;
		right: 0;
	}
</style>