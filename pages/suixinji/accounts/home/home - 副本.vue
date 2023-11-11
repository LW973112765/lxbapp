<template>
	<view>
		<view class="headBox">
			<view class="title">本月支出</view>
			<view class="headTitle bold">
				<text>￥{{costMoney}}</text>
			</view>
			<view class="flexRow">
				<view class="headFoot">
					<view class="title">本月收入</view>
					<view class="bold">￥{{wageMoney}}</view>
				</view>
				<view class="headFoot" v-if="bookList.budget-costMoney>=0">
					<view class="title" style="color: greenyellow;" >剩余预算</view>
					<view class="bold" style="color: greenyellow;">￥{{bookList.budget-costMoney>=0?bookList.budget-costMoney:costMoney-bookList.budget}}</view>
				</view>
				<view class="headFoot" v-else>
					<view class="title" style="color: red;">超出预算</view>
					<view class="bold" style="color: red;">￥{{bookList.budget-costMoney>=0?bookList.budget-costMoney:costMoney-bookList.budget}}</view>
				</view>
			</view>
		</view>
		<!-- 账单列表 -->
		<view class="billBox">
			<view class="billTilte">
				<text>本月账单</text>
				<text @click="seeList()">全部账单 ></text>
			</view>
			<view v-for="(item,index) in accList" :key="index" class="dayAccBox">
				<view class="billTime">
					{{item.title}}
				</view>
				<view @click="openDetail(itemTwo)" v-for="itemTwo in item.List" :key="itemTwo.id" class="billList">
					<image :src="itemTwo.img" class="billImg" mode=""></image>
					<view class="billContent">
						<view class="contentTitle">
							{{itemTwo.name}}
						</view>
						<view class="remark">
							{{$u.timeFormat(itemTwo.datetime, 'hh:MM')}} {{itemTwo.remark}}
						</view>
					</view>
					<view v-if="itemTwo.statusPay == 0" class="billMoney">
						-￥{{itemTwo.money}}
					</view>
					<view v-else class="billMoney" style="color: #008057;">
						+￥{{itemTwo.money}}
					</view>
				</view>
			</view>
			<view v-if="accList.length<1">
				<u-empty mode="list" text="本月暂无账单"></u-empty>
			</view>
		</view>
		<view style="height: 200rpx;"></view>
		<foo-bar @toIndex="toIndex"   :home="0"></foo-bar>
	</view>
</template>
<script>
	import moment from "moment";
	import typeStatu from '../../../../static/typeStatu.json'
	import fooBar from "@/components/fooBar/fooBar.vue"
	export default {
		components: {
			fooBar
			
		},
		data() {
			return {
				isFirst: true,
				costMoney: 0,
				wageMoney: 0,
				typeList: typeStatu,
				showMoney: 0, // 0显示、1隐藏
				yearTime: '',
				monthTime: '',
				accList: '',
				bookList: {
					budget: 2200
				}, // 账本信息
			}
		},
		onLoad() {
		},
		onShow() {
			this.yearTime = uni.$u.date(Date.parse(new Date()), 'yyyy')
			this.monthTime = uni.$u.date(Date.parse(new Date()), 'mm')
			// if(!this.isFirst){
			// 	this.getBook()
			// } 
			this.getBook()
		},
		methods: {
			seeList(){
				console.log(555)
				uni.navigateTo({
					url:"/pages/suixinji/accounts/listAcc/listAcc",
					animationType:'zoom-fade-out'
				})
			},
			openDetail(item) {
				uni.setStorageSync('detailAcc',item)
				uni.navigateTo({
					animationType:'zoom-fade-out',
					url:`/pages/suixinji/accounts/detailAcc/detailAcc?id=${item.id}`
					
				})
			},
			// 查询账本
			getBook() {
				let accName = this.yearTime + '-' + this.monthTime
				let resList = uni.getStorageSync(accName).list || []
				
				//指定排序列
				function orderBy(name) { 
					return function(object1, object2) {
						var val1 = object1[name];
						var val2 = object2[name];
						if (val1 < val2) return 1;
						else if (val1 > val2) return -1;
						else return 0;
					}
				}
				resList.sort(orderBy('datetime'));
				
				this.costMoney = 0
				this.wageMoney = 0

				resList.map(accValue => {
					if (accValue.statusPay == 0) {
						this.costMoney += parseInt(accValue.money)
					} else {
						this.wageMoney += parseInt(accValue.money)
					}
					accValue['title'] = uni.$u.date((accValue.datetime), 'mm月dd日')
					this.typeList.map(typeValue => {
						if (typeValue.id == accValue.typeStatu) {
							accValue['img'] = typeValue.img
							accValue['name'] = typeValue.name
						}
					})
				})

				// 进行分类
				let dataArr = [];
				resList.map(accValue => {
					if (dataArr.length == 0) {
						dataArr.push({
							title: accValue.title,
							List: [accValue]
						})
					} else {
						let res = dataArr.some(item => { //判断相同日期，有就添加到当前项
							if (item.title == accValue.title) {
								item.List.push(accValue)
								return true
							}
						})
						if (!res) { //如果没找相同日期添加一个新对象
							dataArr.push({
								title: accValue.title,
								List: [accValue]
							})
						}
					}
				})
				this.accList = dataArr
				
			},
			toIndex(index) {
				if (index == 0) {
					console.log(index)
					uni.navigateTo({
						url: "/pages/suixinji/accounts/home/home",
						animationType:'zoom-fade-out'
					})
				} else if (index == 1) {
					console.log(index)
					uni.navigateTo({
						url: "/pages/suixinji/accounts/my/my",
						animationType:'zoom-fade-out'
					})
				} else if (index == 2) {
					console.log(index)
					uni.navigateTo({
						url: "/pages/suixinji/accounts/addAcc/addAcc",
						animationType:'zoom-fade-out'
					})
				}
			},

		}
	}
</script>

<style lang="scss">
	page{
		background-color: #1c2025;
	}
	.headBox {
		background: #242a2f;
		padding: 100rpx 30rpx 30rpx 30rpx;
		color: #FFFFFF;
		margin-bottom: 30rpx;
	}

	.headTitle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 72rpx;
	}

	.bold {
		font-weight: bold;
	}

	.title {
		font-size: 28rpx;
		padding: 40rpx 0 10rpx;
	}

	.flexRow {
		display: flex;
		flex-direction: row;
	}

	.headFoot {
		flex: 1;
	}

	.left20 {
		margin-left: 20rpx;
	}

	.billBox {
		padding: 0 20rpx;
		color: #FFFFFF;
	}

	.billTilte {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		background: #242a2f;
		padding: 18rpx 20rpx;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.dayAccBox{
		padding: 20rpx;
		background: #242a2f;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
	}

	.billTime {
		color: #FFFFFF;
		font-size: 28rpx;
		line-height: 52rpx;
		// border-bottom: 2rpx #F7F7F7 solid;
	}

	.billList {
		display: flex;
		align-items: center;
	}

	.billImg {
		width: 80rpx;
		height: 80rpx;
		padding: 20rpx;
	}

	.billContent {
		flex: 1;
	}

	.contentTitle {
		line-height: 60rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.billContent .remark {
		font-size: 26rpx;
		color: #b4b4b4;
	}

	.billMoney {
		color: #ff4c4c;
		font-size: 36rpx;
		font-weight: bold;
	}
</style>
