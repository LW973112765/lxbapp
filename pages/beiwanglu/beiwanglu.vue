<template>
	<view>
		<view class="header">
			<view class="top" v-if="!isquanxuan && !issearch">
				<text style="font-size: 30rpx; font-weight: bold;">备忘录</text>
				<image @click="changeModel" src="../../static/images/other/quanxuan.png" mode=""></image>
			</view>
			<view class="top2" v-if="isquanxuan">
				<text>已选择{{length+'个'}}项目</text>
				<text style="color: royalblue;" @click="changeModel">取消</text>
			</view>
			<view class="bottom">
				<input v-model="searchval" class="uni-input" @input="search($event)" @focus="focus"
					:disabled="isquanxuan" type="text" placeholder="搜索备忘录"> <text @click="focus"
					v-if="issearch">取消</text>
			</view>
		</view>
		<view class="content">
			<me-select ref="meSelect" @change="change" @finish="finish" @itemClick="itemClick" :datalist="dataList"
				:options="options" v-if="dataList.length>0&& !issearch">
				<view slot-scope="slot" class="item">
					<view class="main">
						<view class="shang" v-html="slot.slotScope.item.title">

						</view>
						<view class="zhong" v-html="slot.slotScope.item.content">

						</view>
						<view class="xia" v-html="slot.slotScope.item.date">

						</view>
					</view>
				</view>
			</me-select>

		</view>
		<!-- 		<view class="main" v-for="(item,id) in data" :key="id" >
			<view class="shang" v-html="item.title">
			</view>
			<view class="zhong" v-html="item.content">
			
			</view>
			<view class="xia" v-html="item.date">
				
			</view>
		</view> -->
		<view class="nodata" v-if="dataList.length==0 && searchval.trim()==''">
			<view class="">
				<image src="../../static/images/personal/15.png" mode=""></image>
			</view>
			<view>无备忘数据哦😊</view>
		</view>
		<view class="nodata" v-if="dataList.length==0 && searchval.trim()!=''">
			<view class="">
				<image src="../../static/images/personal/15.png" mode=""></image>
			</view>
			<view>无搜索结果哦😊</view>
		</view>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="删除" :title="content"
					@confirm="dialogConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import moment from "moment";
	import meSelect from '@/components/me-select/me-select.vue'
	export default {
		components: {
			meSelect
		},
		data() {
			return {
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				content: '',
				isquanxuan: false,
				issearch: false,
				width: '0rpx',
				length: "",
				options: {
					flags: ['id'], //设置需要返回的参数这个参数必须在 dataList 中的item中存在（不配置默认全部返回）
					itemCanSelect: true //是否开启点击列表页选择配置
				},
				dataList: [],
				data: [],
				startsearch: false,
				searchval: '',
				arr: [],
				timer: null
			};
		},
		watch: {
			searchval(newval, oldval) {
				console.log(newval, '新')
				console.log(oldval, '旧')

			}
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onShow() {
			if (this.searchval == '') {
				this.getmemo()
			} else {
				this.searchmemeo()
			}
		},
		onLoad() {
			this.getmemo()
			uni.$on('freshbeiwanglu', (gg) => {
				this.getmemo()
				// console.log(gg)
			})
		},
		methods: {
			async searchmemeo(val) {
				this.startsearch = !this.startsearch
				let res = await this.$zxl('/searchmemo', {
					userid: this.userinfo.id,
					search: this.searchval
				})
				if (res.data.status == 200) {
					res.data.data.forEach((data) => {
						data.date = moment(data.date).format(
							"YYYY-MM-DD HH:mm:ss"
						);
					});
					res.data.data
					this.changeColor(res.data.data)
					console.log(res.data.data, '备忘录搜素')
				} else {
					this.dataList = []
				}

			},
			search($event) {
				console.log($event.detail.value)
				if ($event.detail.value.trim() == '') {
					this.getmemo()
				} else {
					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						this.searchmemeo();
					}, 1000);
				}
			},
			changeColor(data1) {
				data1.map((item, index) => {
					if (this.searchval) {
						let replaceReg = new RegExp(this.searchval, "ig");
						let replaceString = `<span style="color: #ffff7d">${this.searchval}</span>`;
						data1[index].title = item.title.replace(
							replaceReg,
							replaceString
						);
						data1[index].date = item.date.replace(
							replaceReg,
							replaceString
						);
						data1[index].content = item.content.replace(
							replaceReg,
							replaceString
						);
					}
				});
				this.dataList = data1;
			},
			messageToggle(type, zxl) {
				this.msgType = type
				this.messageText = zxl
				this.$refs.message.open()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			async dialogConfirm() {
				console.log('点击确认l')
				this.$refs.message.open()
				let res = await this.$zxl('/delmemo', {
					arr: this.arr
				})
				if (res.data.status == 200) {
					this.messageToggle('success', '删除成功')
					this.getmemo()
					this.changeModel()
				}
			},
			focus() {
				// 	this.searchval=''
				// this.issearch=!this.issearch

			},
			async getmemo() {
				let res = await this.$zxl('/getmemo', {
					id: this.userinfo.id
				})
				if (res.data.status == 200) {
					res.data.data.forEach((data) => {
						data.date = moment(data.date).format(
							"YYYY-MM-DD HH:mm:ss"
						);
					});
					this.dataList = res.data.data
					console.log(res.data.data, '备忘录')
				} else {
					this.dataList = []
				}
			},
			changeModel() {
				this.$refs.meSelect.changeModel()
				this.isquanxuan = !this.isquanxuan
			},
			// getSelectAll() {
			//     var result = this.$refs.meSelect.getSelectAll()
			//     console.log('当前全选：', result)
			// },
			itemClick(e) {
				console.log('列表点击了55：', e)
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/beiwangludetail/beiwangludetail?id=${e.id}`
				})
			},
			async finish(e) {
				console.log('所有的选择：', e)
				let length = e.length
				this.content = `确定要删除这${length}条备忘录吗？`
				e.forEach(item => {
					this.arr.push(item.id)
				})
				console.log(this.arr)
				this.dialogToggle('warn')

			},
			change(e) {
				console.log('发生改变了：', e)
				this.length = e.length
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "/pages/addbeiwanglu/addbeiwanglu",
				animationType: 'zoom-fade-out'
			})
		},
	}
</script>

<style lang="scss">
	.main {
		// width: 700rpx;
		border-radius: 10rpx;
		height: auto;
		padding: 30rpx;
		background: -webkit-linear-gradient(top, #999999, pink);

		.shang {
			font-size: 40rpx;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.zhong,
		.xia {
			color: #999
		}

		.zhong {
			// line-height: 25rpx;
			padding: 10rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}


	}

	.header {
		transition: all 0.5s;
		width: 750rpx;
		// height: 100rpx;
		box-sizing: border-box;
		position: fixed;
		padding: 10rpx 17rpx;
		z-index: 55;
		top: 0;
		left: 0;
		background-color: whitesmoke;

		input {
			margin-top: 20rpx;
			flex: 1;
			height: 80rpx;
			border-radius: 5rpx;
			background-color: darkgrey;
		}

		.top,
		.top2 {
			z-index: 55;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

	.content {
		position: relative;
		top: 150rpx;
	}

	.bottom {
		transition: all 0.5s;
		display: flex;
		flex-wrap: nowrap;

		text {
			margin-top: 20rpx;
			line-height: 80rpx;
			height: 80rpx;
			margin-left: 20rpx;
		}
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

	.uni-input {
		box-sizing: border-box;
		padding-left: 20rpx;
	}
</style>