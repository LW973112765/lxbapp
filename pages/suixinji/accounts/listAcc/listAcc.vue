<template>
	<view class="listBox">
		<view v-for="(accList,i) in accAllList" :key="i" class="listItemBox">
			<view class="listTitle">
				<text>{{accList[0].dataTitle}}</text>
				<text v-show="accList[0].allMoney < 0" style="flex: 1;text-align: center;color: #008057;">总收入：{{Math.abs(accList[0].allMoney)}}</text>
				<text v-show="accList[0].allMoney > 0" style="flex: 1;text-align: center;color: #ff4c4c;">总支出：{{Math.abs(accList[0].allMoney)}}</text>
				<u-icon v-if="seletInxde == i" @click="setSelet(i)" name="arrow-down" color="#FFF"></u-icon>
				<u-icon v-else @click="setSelet(i)" name="arrow-right" color="#FFF"></u-icon>
			</view>
			<view v-show="seletInxde == i" v-for="(item,index) in accList" :key="index" class="dayAccBox">
				<view class="billTime">
					{{item.title}}
				</view>
				<view  v-for="itemTwo in item.List" :key="itemTwo.id" class="billList">
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
		</view>
		
		<view v-if="accAllList.length<1">
			<u-empty mode="list" text="暂无账单"></u-empty>
		</view>
		
	</view>
</template>

<script>
	import typeStatu from '../../../../static/typeStatu.json'
	export default {
		data() {
			return {
				typeList: typeStatu,
				accList: '', 
				accAllList:[], // 总数据
				seletInxde:null,
			}
		},
		onShow() {
			
			this.getAllBook()
		},
		methods: {
			setSelet(i){
				if(this.seletInxde == i){
					this.seletInxde = null
				}else{
					this.seletInxde = i
				}
			},
			getAllBook(){
				this.accAllList = []
				const res = uni.getStorageInfoSync();
				for(var i=0;i<res.keys.length;i++){
					if(res.keys[i].length == 7){
						this.getBook(res.keys[i])
						this.accAllList.push(this.accList) 
					}
				}
				console.log(this.accAllList)
			},
			// 查询账本
			getBook(accName) {
				this.accList = {}
				let resList = uni.getStorageSync(accName).list
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
			
				resList.map(accValue => {
					accValue['title'] = uni.$u.date((accValue.datetime), 'mm月dd日')
					this.typeList.map(typeValue => {
						if (typeValue.id == accValue.typeStatu) {
							accValue['img'] = typeValue.img
							accValue['name'] = typeValue.name
						}
					})
					
				})
			console.log(resList)
				// 进行分类
				let dataArr = [];
				resList.map(accValue => {
					if (dataArr.length == 0) {
						dataArr.push({
							'title': accValue.title,
							'allMoney':uni.getStorageSync(accName).allMoney,
							'dataTitle':accName,
							'List': [accValue]
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
								'title': accValue.title,
								'allMoney':uni.getStorageSync(accName).allMoney,
								'dataTitle':accName,
								'List': [accValue]
							})
						}
					}
				})
				this.accList = dataArr
				
			},
		}
	}
</script>

<style>
page{
	background-color: #1c2025;
}

.listBox{
	padding: 30rpx;
}

.listItemBox{
	padding: 20rpx;
	background: #242a2f;
	border-radius: 20rpx;
	margin-bottom: 20rpx;
}

.listTitle{
	color: #FFFFFF;
	display: flex;
}



	.dayAccBox{
		padding-top: 20rpx;
		background: #242a2f;
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
