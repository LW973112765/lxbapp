<template>
	<view class="mainmain">
		<scroll-view scroll-x class="navScroll" enable-flex scroll-into-view="navId" scroll-with-animation>
			<view class="navItem" v-for="(item,id) in CategoryList" :key="id">
				<view @click="changeNav(item.id)" :class="item.id==navId ? 'active' : 'root'">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="main">
			<!-- 我的评论 -->
			<note-list v-if="navId==1&&mycomment.length>0" :list="mycomment" :threshold="threshold" :options="options"
				@del="deletemycomment">
				<template slot-scope="{item ,index}">
					<view class="recentItem">
						<view class="info">
							你在&nbsp;&nbsp;{{item.created_at | dateFormat}}&nbsp;&nbsp;发表了一条评论
						</view>
						<view class="">
							<text class="comment">发表内容是</text><text class="content">{{item.content}}</text>
						</view>
					</view>
				</template>
			</note-list>

			<!-- 评论我的 -->
			<scroll-view scroll-y class="recentScroll" enable-flex v-if="navId==2&&comment.length>0">
				<view class="recentItem" v-for="(item,id) in comment" :key="item.id">
					<view class="info" v-show="item.senderid!=userid">
						用户<text
							style="text-decoration: underline;font-weight: 500;color: blueviolet;">{{item.username}}</text>在&nbsp;&nbsp;{{item.created_at | dateFormat}}&nbsp;&nbsp;回复了你的评论
					</view>
					<view class="info" v-show="item.senderid==userid">
						你在&nbsp;&nbsp;{{item.created_at | dateFormat}}&nbsp;&nbsp;回复了自己的评论
					</view>
					<view class="">
						<text class="comment">回复内容是</text><text class="content">{{item.content}}</text>
					</view>

				</view>
			</scroll-view>
			<!-- 我的留言 -->
			<note-list v-if="navId==3&&mymessage.length>0" :list="mymessage" :threshold="threshold" :options="options"
				@del="deletemymessage">
				<template slot-scope="{item ,index}">
					<view class="recentItem">
						<view class="info">
							你在&nbsp;&nbsp;{{item.created_at | dateFormat}}&nbsp;&nbsp;发表了一条留言
						</view>
						<view class="">
							<text class="comment">留言内容是</text><text class="content">{{item.content}}</text>
						</view>
					</view>
				</template>
			</note-list>
			<!-- 留言回复 -->
			<scroll-view scroll-y class="recentScroll" enable-flex v-if="navId==4&&message.length>0">
				<view class="recentItem" v-for="(item,id) in message" :key="item.id">
					<view class="info">
						管理员{{item.answername}}在&nbsp;&nbsp;{{item.created_at | dateFormat}}&nbsp;&nbsp;回复了你的留言
					</view>
					<view class="">
						<text class="comment">回复内容是</text><text class="content">{{item.content}}</text>
					</view>
				</view>
			</scroll-view>
			<!-- 我的评论 -->
			<view class="nodata" v-if="navId==1&&mycomment.length==0">
				<view class="">
					<image src="../../static/images/personal/15.png" mode=""></image>
				</view>
				<view>要注意活跃发言哦😊</view>
			</view>
			<!-- 评论我的 -->
			<view class="nodata" v-if="navId==2&&comment.length==0">
				<view class="">
					<image src="../../static/images/personal/11.png" mode=""></image>
				</view>
				<view>还没有人评论你哦😊</view>
			</view>
			<!-- 我的留言 -->
			<view class="nodata" v-if="navId==3&&mymessage.length==0">
				<view class="">
					<image src="../../static/images/personal/12.png" mode=""></image>
				</view>
				<view>请尽管吐槽吧😊</view>
			</view>
			<!-- 留言回复 -->
			<view class="nodata" v-if="navId==4&&message.length==0">
				<view class="">
					<image src="../../static/images/personal/14.png" mode=""></image>
				</view>
				<view>请耐心等待管理员回复😊</view>
			</view>
		</view>
	</view>
</template>
<script>
	import moment from "moment";
	export default {
		name: "Article",
		data() {
			return {
				itemHeight: 300, //默认高度120rpx
				threshold: 50,
				options: [ //左滑的操作列表
					{
						color: '#ffffff',
						bgColor: '#409EFF',
						text: '编辑',
						width: 120,
					},
					{
						color: '#ffffff', //字体颜色，非必须，默认 #ffffff
						bgColor: '#FF4058', //背景颜色，非必须，默认 #409EFF
						text: '删除', //展示文字
						width: 120, //按钮宽度 默认120rpx 适合两个字的宽度 这个宽度按需调整
					}
				],
				coverTransform: 'translateX(0)',
				coveTransition: '',
				mycomment: [],
				mymessage: [],
				comment: [],
				message: [],
				navId: '',
				userid: '',
				currentid: '',
				CategoryList: [{
						id: 1,
						name: '我的评论'
					}, {
						id: 2,
						name: '评论我的'
					},

					{
						id: 3,
						name: '我的留言'
					}, {
						id: 4,
						name: '留言回复'
					},
				]

			};
		},

		methods: {
			//切换导航
			changeNav(id) {
				this.navId = id
				//我的评论
				console.log(this.navId, '导航id')
				if (this.navId == 1) {
					this.getmycomment(this.userid)
				}
				//评论我的
				if (this.navId == 2) {
					this.getcommentmy(this.userid)
				}
				//我的留言
				if (this.navId == 3) {
					this.getmymessage(this.userid)
				}
				//回复我的
				if (this.navId == 4) {
					this.getmessage(this.userid)
				}
			},
			//我的评论
			async getmycomment(senderid) {
				let res = await this.$zxl('/getnotecomment', {
					senderid
				})
				console.log(res)
				if (res.data.status == 200) {
					res.data.data.forEach(i => {
						i.content = this.$emojitwo(i.content)
					})
					this.mycomment = res.data.data
				} else {
					this.mycomment = []
				}
			},
			async deletemycomment(id) {
				console.log('我的评论', id)
				await this.$zxl('/deletecomment', {
					id
				})
				this.getmycomment(this.userid)
			},
			//评论我的
			async getcommentmy(id) {
				let res = await this.$zxl('/getcommentmy', {
					id
				})
				console.log(res.data.data, '评论我的')
				if (res.data.status == 200) {
					res.data.data.forEach(i => {
						i.content = this.$emojitwo(i.content)
					})
					this.comment = res.data.data
				} else {
					this.comment = []
				}
			},
			//我的留言
			async getmymessage(id) {
				let res = await this.$zxl('/getnotemessage', {
					id
				})
				// console.log(res,'我的留言')
				if (res.data.status == 200) {
					res.data.data.forEach(i => {
						i.content = this.$emojitwo(i.content)
					})
					this.mymessage = res.data.data
				} else {
					this.mymessage = []
				}
			},
			async deletemymessage(id) {
				console.log('我的留言', id)
				await this.$zxl('/deletemessage', {
					id
				})
				this.getmymessage(this.userid)
			},
			//留言回复
			async getmessage(id) {
				let res = await this.$zxl('/getmessagemy', {
					id
				})
				console.log(res, '我的留言')
				if (res.data.status == 200) {
					res.data.data.forEach(i => {
						i.content = this.$emojitwo(i.content)
					})
					this.message = res.data.data
				} else {
					this.message = []
				}
			},
		},
		onLoad(e) {
			this.userid = e.userid
		},
		created() {
			this.navId = 1
			this.getmycomment(this.userid);
		},
	};
</script>

<style lang="less" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.mainmain {
		padding-bottom: 20rpx;
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

	.recentScroll {
		display: flex;
		// padding-top: 20rpx;
		width: 100%;
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

		height: auto;
		// background-color: lightgray;
		background: -webkit-linear-gradient(top, pink, #999999);
		padding: 20rpx;

		.info {
			margin-bottom: 20rpx;
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

	.recentItem .content {
		width: 100%;
		margin-top: 20rpx;
		font-size: 27rpx;
		color: yellow;
		display: block;
		word-wrap: break-word;
		word-break: break-all;

		// white-space: nowrap;
		// overflow: hidden;
		// text-overflow: ellipsis;

	}

	.recentItem .comment {
		margin-top: 20rpx;
	}

	.nodata {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		image {
			width: 200rpx;
			height: 200rpx;
		}

		view {
			margin: 0 auto;
			text-align: center;
			color: #999;
			font-size: 30rpx;
		}
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
		height: 80rpx;
		margin-bottom: 20rpx
	}


	.navScroll .navItem {
		padding: 0 30rpx;
		font-size: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
		display: inline-block;
		transition: all 0.5s;
	}

	.navScroll view {
		height: 60rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		transition: all 0.5s;
	}


	.navItem .active {
		// border-bottom: 1rpx solid #d43c33;
		// color: #d43c33;
		// border-bottom: 1rpx solid #d43c33;
		text-decoration: underline;
		font-size: 50rpx;
		color: #d43c33;
		font-style: italic;
	}

	.root {
		color: green;
		font-size: 30rpx;
	}
</style>