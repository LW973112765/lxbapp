<template>
	<view class="mainbox">
		<scroll-view scroll-x class="navScroll" enable-flex scroll-into-view="navId" scroll-with-animation
			v-show="isload">
			<view class="navItem" v-for="(item,id) in CategoryList" :key="id">
				<view @click="changeNav(item.id)" :class="item.id==navId ? 'active' : 'root'">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-x class="navScroll" enable-flex scroll-into-view="navId" scroll-with-animation
			v-show="isload">
			<view class="navItem" v-for="(item,index) in yearlist" :key="index">
				<view @click="changeYear(item)" :class="item==yearId ? 'active' : 'root'">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="animeitem">
			<AnimeItem :anime="anime" v-for="(item, id) in anime" :key="item.id" :item="item" />
		</view>
		<view class="nocontent" v-show="total==0">
			无内容
		</view>
		<u-toast ref="uToast"></u-toast>
		<view class="load2" v-if="!isload">
			<zero-loading class="loadson" position="absolute" v-if="!isload"></zero-loading>
		</view>
	</view>

</template>
<script>
	import moment from "moment";
	export default {
		name: "anime",
		data() {
			return {
				data: [],
				anime: [],
				isload: false,
				total: 1,
				navId: null,
				CategoryList: "",
				yearlist: [],
				yearId: null,
				triggered: false
			};
		},
		onPullDownRefresh() {
			this.fresh()
		},
		watch: {
			anime: {
				handler() {
					this.total = this.anime.length
				},
				deep: true
			}
		},
		methods: {
			//下拉刷新
			fresh() {
				console.log('下拉')
				this.triggered = true
				setTimeout(() => {
					this.http(1)
					uni.stopPullDownRefresh()
					this.$refs.uToast.show({
						type: 'success',
						message: "刷新成功！",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				}, 1500)
			},
			update() {
				//1.两个都为全部
				if (this.navId == 0 && this.yearId == '全部') {
					this.anime = this.data
				}
				//2.全部 2000
				else if (this.navId == 0 && this.yearId > 0) {
					let newarr = this.data.filter((item) => {
						return item.created_at == this.yearId
					})
					this.anime = newarr
				}
				//3.战斗 全部
				else if (this.navId && this.yearId == '全部') {
					let newarr = this.data.filter((item) => {
						return item.tag.includes(this.navId) == true
					})
					this.anime = newarr
				}
				//4.战斗 2000
				else {
					let newarr = this.data.filter((item) => {
						return item.tag.includes(this.navId) == true && item.created_at == this.yearId
					})
					this.anime = newarr
				}
			},
			//切换导航
			changeNav(id) {
				this.navId = id
				this.update()
			},
			changeYear(id) {
				this.yearId = id
				this.update()
			},
			makeyear() {
				let year = new Date().getFullYear() + 1
				console.log(year, '年')
				for (var i = 2000; i < year; i++) {
					this.yearlist.unshift(i)
				}
				this.yearlist.unshift('全部')
				this.yearId = this.yearlist[0]
			},
			//获取动漫分类
			async getcategory() {
				let res = await this.$zxl('/getallfuntype')
				// console.log("//获取动漫分类", res);
				this.CategoryList = res.data.data
				this.CategoryList.unshift({
					id: 0,
					name: '全部'
				})
				this.navId = res.data.data[0].id

			},
			changePage(num) {
				this.http(num);
			},
			// 获取动漫列表
			async http(page) {
				// console.log("收到了", page);
				let res = await this.$zxl('/getallanime', {
					page,
				})
				// console.log(res.data);
				if (res.data.status === 200) {
					this.isload = true
					console.log(res.data.data)
					res.data.data.forEach((data) => {
						data.tag = data.tag.split(",").map((item) => item * 1);
					});
					this.data = res.data.data
					this.anime = res.data.data
					this.triggered = false
				} else {
					this.isload = true
					this.total = 0
				}

			},
		},
		created() {
			this.http(1);
			this.getcategory()
			this.makeyear()
			console.log('created')
		},
		onLoad() {
			this.http(1);
			this.getcategory()
			console.log('onload')
		}
	};
</script>
<style>
	page {
		background: url("../../static/images/bg/4.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;

	}
</style>
<style lang="less" scoped>
	page {
		// background: -webkit-linear-gradient(top,  #999999,pink);
	}

	* {
		margin: 0;
		padding: 0;
	}

	.nocontent {
		width: 700rpx;
		height: 500rpx;
		border-radius: 10rpx;
		// background-color: #999;
		background: url("../../static/images/bg/16.jpg");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		text-align: center;
		line-height: 500rpx;
		font-size: 50rpx;
		margin: 0 auto;
	}

	// .main {
	//   box-sizing: border-box;
	//   position: relative;
	//   font-size: 16rpx;
	//   padding-top: 10rpx;
	//   padding-left: 20rpx;
	//   padding-bottom: 10rpx;
	//   width: 600rpx;
	//   height: auto;
	//   margin: 50rpx auto;
	//   // background-color: rgba(0, 0, 0, 0.5);
	//   // background-color: #999999;
	// }
	.anime {
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
		transition: all 0.5s;
		font-size: 30rpx;
	}


	.navItem .active {
		border-bottom: 1rpx solid #d43c33;
		font-size: 50rpx;
		color: #d43c33;
		font-style: italic;
	}

	.root {
		color: aqua;
		font-size: 30rpx;
	}

	.animeitem {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		/* align-items:baseline; */
		/* justify-items: flex-start; */

	}

	.mainbox {
		padding-bottom: 30rpx;
	}

	.load2 {
		width: 750rpx;
		height: 100rpx;
		margin: 300rpx auto;
	}
</style>