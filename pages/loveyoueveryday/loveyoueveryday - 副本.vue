<template>
	<view class="main">
		<uni-calendar ref="calendar" :insert="false" :lunar="true" :start-date="'2021-09-21'" :end-date="enddate"
			@confirm="confirm" @change="change" />
		<view class="header">
			<view class="" v-show="date" @click="showall">
				显示全部
			</view>
			<view class="lovetitle" v-show="!date" :style="style_box">
				I LOVE YOU EVERYDAY
			</view>
			<view class="lovetitle" v-show="date" :style="style_box">
				{{date}}
			</view>
			<view class="" @click="open">
				选择日期
			</view>
		</view>
		<view class="other" v-for="(item,id) in data" :key="id">
			<view class="top">
				<image src="../../static/images/choujiang/wode.png" mode=""></image>
				<view class="title">
					{{item.title}}
				</view>
			</view>

			<view class="buttom">
				{{item.time}}
			</view>


		</view>
		<wyb-pagination v-show="!date" :total-items="total" :current="currentPage" :page-items="pageSize"
			@change="changePage" />
	</view>
	</view>
</template>

<script>
	import moment from "moment";
	import wybPagination from '@/components/wyb-pagination/wyb-pagination.vue'
	export default {
		components: {
			wybPagination
		},
		data() {
			return {
				txtColor1: '#3498db',
				txtColor2: '#f47920',
				txtColor3: '#d71345',
				txtColor4: '#f7acbc',
				txtColor5: '#ffd400',
				txtColor6: '#3498db',
				txtColor7: '#f47920',
				txtColor8: '#d71345',
				txtColor9: '#f7acbc',
				txtColor10: '#ffd400',
				txtColor11: '#3498db',
				istotal: true,
				data: [],
				total: 0,
				pageSize: 8,
				currentPage: 1,
				enddate: '',
				date: ''
			};
		},
		computed: {
			style_box() {
				let that = this;
				var style = '';
				style +=
					`background-image: -webkit-linear-gradient(left, ${that.txtColor1}, ${that.txtColor2} 10%, ${that.txtColor3} 20%, ${that.txtColor4} 30%, ${that.txtColor5} 40%, ${that.txtColor6} 50%, ${that.txtColor7} 60%, ${that.txtColor8}  70%, ${that.txtColor9} 80%, ${that.txtColor10} 90%, ${that.txtColor11});`;
				return style;
			},
		},
		created() {
			this.getdata(1)
			this.enddate = moment().format("YYYY-MM-DD")
		},
		methods: {
			change() {

			},
			showall() {
				this.date = ''
				this.getdata(1)
			},
			confirm(e) {
				console.log(e.fulldate);
				this.date = e.fulldate
				this.search()
			},
			open() {
				this.$refs.calendar.open();

			},
			changePage(num) {
				console.log(num, '收到')
				this.getdata(num.current);
			},
			async search() {
				let res = await this.$zxl('/searchloveyoueveryday', {
					search: this.date
				})
				if (res.data.status == 200) {
					res.data.data[0].time = moment(res.data.data[0].time).format(
						"YYYY-MM-DD HH:mm:ss"
					);
					this.data = res.data.data
					console.log(res.data.data[0], '数据')
				}
			},
			async getdata(page) {
				let res = await this.$zxl('/getloveyoueveryday', {
					page
				})
				this.currentPage = page;
				if (res.data.status == 200) {
					res.data.data.forEach((data) => {
						data.time = moment(data.time).format(
							"YYYY-MM-DD HH:mm:ss"
						);
					});
					console.log(res.data.data, '数据')
					this.data = res.data.data;
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lovetitle {
		// position: relative;
		// margin-top: 20rpx;
		// font-size: 40rpx;
		// padding: 20rpx;
		color: transparent;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		-webkit-animation: slide1 2s infinite linear;
		animation: slide1 5s infinite linear;
	}

	.green {
		color: green
	}

	.red {
		color: red
	}

	.blue {
		color: blue
	}

	.main {
		width: 100%;
		height: auto;
		padding-top: 30rpx;
	}

	.other {
		margin: 0 auto;
		box-sizing: border-box;
		width: 100%;
		height: 150rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		border-bottom: 1px solid #ebeef5;

		.top {
			// width: 280rpx;
			height: 60rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;

			view {
				// width: 200rpx;
				margin-left: 30rpx;
				text-align: left;
				// background-color: red;
			}
		}

		image {
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
		}

	}

	.buttom {
		float: right;
	}

	.header {
		margin-top: 30rpx;
		width: 750rpx;
		height: 100rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: center;
		// background-color: blue;
	}
</style>