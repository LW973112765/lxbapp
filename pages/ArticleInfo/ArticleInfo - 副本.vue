<template>
	<view class="main">
		<view class="content" v-for="(item, id) in infoData" :key="id">
			<view class="header">
				<text class="title">{{ item.title }}</text>
				<view>
					<view class="other">发布时间：{{ item.created_at }}</view>
					<!-- <p>分类：<text>{{}}</text></p> -->
					<view class="other">作者：{{ item.author }}</view>
					<view class="other">{{
              item.total
            }}
						次阅读</view>
				</view>
				<view class="other">{{ commenttotal }} 条评论</view>
				<view class="other">{{ item.collecttotal }} 人收藏</view>
			</view>

			<view class="wapper">
				<zero-markdown-view :codeBgColor="zxl" :markdown="item.content"></zero-markdown-view>
			</view>
			<view class="comment">
				<Comment :articleid="articleid" @etitcomment="etitcomment"></Comment>
			</view>
			<view class="commentlist">
				<CommentList @getcurrentid="getcurrentid" :currendid="currendid" :articleid="articleid"
					v-for="(item, id) in commentListz" :key="item.id" :item="item" @etitcomment="etitcomment">
				</CommentList>
			</view>
		</view>
	</view>
</template>
<script>
	import moment from "moment";
	var timer = null
	export default {
		name: "ArticleInfo",
		data() {
			return {
				articleid: '',
				infoData: [],
				commenttotal: 0,
				total: 10,
				pageSize: 8,
				liulanliang: "",
				commentListz: [],
				zxl: '#430000',
				viewtime: 0, //浏览时长
				jifen: 0,
				currendid: null
			};
		},
		watch: {

		},
		mounted() {

		},
		onLoad(e) {
			this.articleid = e.id
			// console.log(e,'收到')
			this.getArtileInfo(e.id);
			this.getComment(e.id);
			this.getCommentTotal(e.id);
			this.getjifen()
			timer = setInterval(() => {
				this.getviewtime()
			}, 1000)
		},
		onUnload() {
			console.log(this.viewtime, 'onUnload')
			clearInterval(timer)
			this.jifen += this.viewtime * 50
			this.fresh()
			this.addjifenjilu(this.viewtime * 50)
		},
		methods: {
			getcurrentid(id) {
				this.currendid = id
				console.log('点前id', this.currendid)
			},
			async getjifen() {
				let res = await this.$zxl('/getjifen')
				this.jifen = res.data.data[0].total
			},
			async addjifenjilu(total) {
				await this.$zxl('/addjifenjilu', {
					total,
					name: '浏览文章',
					time: moment().format("YYYY-MM-DD HH:mm:ss"),
					type: 1
				}, 'POST')
			},

			async fresh() {
				await this.$zxl('/editjifen', {
					total: this.jifen
				}, 'POST')
			},
			getviewtime() {
				this.viewtime += 1
				this.viewtime = this.viewtime > 60 ? 60 : this.viewtime
				// console.log(this.viewtime)
			},
			etitcomment(val) {
				this.getComment(this.articleid);
				this.getCommentTotal(this.articleid)
			},
			async getComment(articleid) {
				let res = await this.$zxl('/getnoauditcomment', {
					articleid
				})
				console.log(res, '评论')
				if (res.data.status === 200) {
					res.data.data.forEach(i => {
						i.content = this.$emojitwo(i.content)
					})
					this.commentListz = res.data.data;
				} else {
					this.commentListz = []
				}

			},
			async getArtileInfo(zzz) {
				let id = zzz
				let res = await this.$zxl("/getarticleinfo", {
					id
				})
				// console.log(res.data,'文章详情');
				if (res.data.status === 200) {
					res.data.data.forEach((data) => {
						data.created_at = moment(data.created_at).format(
							"YYYY-MM-DD HH:mm:ss"
						);
					});
					this.infoData = res.data.data;
					this.liulanliang = res.data.data[0].total;
					this.liulanliang++;
					this.addLiulanliang(this.liulanliang, zzz);
					let liulan = uni.getStorageSync("liulanjilu");
					if (liulan) {
						liulan = JSON.parse(liulan);
					} else {
						liulan = []
					}
					var liulandata = {
						id: this.infoData[0].id,
						cover: this.infoData[0].cover ||
							"http://lwandzxl.top/%E9%9A%8F%E6%9C%BA%E5%B0%81%E9%9D%A2/IMG_20220417_151831.jpg",
						title: this.infoData[0].title,
						time: moment().format("YYYY-MM-DD HH:mm:ss"),
						type: 'article'
					}
					let result = []
					liulan.forEach((item, index) => {
						if (item.type != liulandata.type) {
							result.push(item)
						} else {
							if (item.type == liulandata.type && item.id != liulandata.id) {
								result.push(item)
							}
						}
					})
					console.log(result)
					result.unshift(liulandata)
					uni.setStorageSync('liulanjilu', JSON.stringify(result))
				}

			},
			async addLiulanliang(total, id) {
				let res = await this.$zxl('/updatearticle', {
					total,
					id
				}, 'POST');
			},
			async getCommentTotal(articleid) {
				let res = await this.$zxl('/getnoauditcommenttotal', {
					articleid
				})
				if (res.data.status === 200) {
					// console.log(res,'评论总数')
					this.commenttotal = res.data.total;
				} else {
					this.commenttotal = 0
				}

			},
		},
	};
</script>

<style lang="less" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.main {
		box-sizing: border-box;
		position: relative;
		font-size: 16rpx;
		// padding-top: 10rpx;
		// padding-left: 20rpx;
		// padding-bottom: 20rpx;
		width: 100%;
		height: auto;
		margin: 10rpx auto;
		// background-color: rgba(0, 0, 0, 0.5);
		background-color: #999999;
	}

	.content {
		width: 100%;
		margin-top: 10rpx;
		// padding-bottom: 30rpx;
		// margin-bottom: 20rpx;
		margin-right: 40rpx;
		background-color: #fff;

		.header {
			width: 100%;
			height: 300rpx;
			text-align: center;
			// padding-top: 10rpx;
			border-bottom: 1rpx solid #eae6e6;

			.title {
				width: 500rpx;
				margin: 0 auto;
				// background-color: red;
				font-size: 40rpx;
				text-align: center;
				// padding-top: 25rpx;
				display: block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.other {
				font-size: 30rpx;
				margin-bottom: 10rpx;
			}
		}

		.comment {
			width: 100%;
			height: 242rpx;
			border-bottom: 1px solid #000;
			margin-bottom: 50rpx;
			// background-color: aqua;
		}

		.commentlist {
			padding-top: 10rpx;
			padding-bottom: 20rpx;
			width: 100%;
			height: auto;
			background-color: #fff;
		}
	}

	.wapper {
		width: 98%;
		height: auto;
		margin: 0 auto;
		background-color: darkgrey;
		margin-top: 20rpx;

	}
</style>