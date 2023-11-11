<template>
	<view>
		<view class="bgBox"></view>
		<view class="detailBox">
			<image :src="list.img" class="imgIcon" mode=""></image>
			<text v-if="list.statusPay == 0" class="moneyTxt">-￥ {{list.money}}</text>
			<text v-else class="moneyTxt" style="color: #008057;">+￥ {{list.money}}</text>
			<text class="title">{{list.name}}</text>
			<u-line dashed margin="30rpx"></u-line>
			<view class="flexBet">
				<text>日期</text>
				<text>{{$u.timeFormat(list.recordtime, 'mm月dd日 hh:MM')}}</text>
			</view>
			<u-line dashed></u-line>
			<view class="flexBet">
				<text>备注</text>
				<text>{{list.remark?list.remark:'暂无'}}</text>
			</view>
		</view>
		<view class="footBox">
			<view @click="editBtn()" class="btnClass edit">
				编辑
			</view>
			<view @click="delBtn()" class="btnClass del">
				删除
			</view>
		</view>

	</view>
</template>

<script>
	import typeStatu from '../../../../static/typeStatu.json'
	export default {
		data() {
			return {
				typeList: typeStatu,
				id: '',
				list: '',
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.list = uni.getStorageSync('detailAcc')

			this.typeList.map(typeValue => {
				if (typeValue.id == this.list.typeStatu) {
					this.list['img'] = typeValue.img
					this.list['name'] = typeValue.name
				}
			})
		},
		methods: {
			delBtn() {
				let accName = this.list.year + '-' + this.list.month

				let arrList = uni.getStorageSync(accName)
				
				arrList.list.map((arr, index) => {
					if (arr.id == this.id) {
						arrList.list.splice(index, 1)
					}
				})
				
				let newAllMoney = 0
				arrList.list.map(arr => {
					if(arr.statusPay == 0){
						newAllMoney =  newAllMoney  + parseInt(arr.money) 
					}else{
						newAllMoney =  newAllMoney  - parseInt(arr.money) 
					}
				})
				arrList.allMoney = newAllMoney
				
				
				uni.setStorageSync(accName, arrList)
				this.$u.toast('删除成功')
				setTimeout(() => {
					uni.navigateBack()
				}, 1200)
			},
			editBtn() {
				uni.setStorageSync('detailAcc', this.list)
				uni.redirectTo({
					url: "/pages/suixinji/accounts/addAcc/addAcc?type=update",
					animationType:'zoom-fade-out'
					
					
				})
			},
		}
	}
</script>

<style>
	page {
		background: #1c2025;
	}

	.bgBox {
		height: 340rpx;
		background: #1c2025;
	}

	.detailBox {
		width: 560rpx;
		margin: -240rpx auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx;
		border-radius: 20rpx;
		background: #242a2f;
	}

	.imgIcon {
		width: 120rpx;
		height: 120rpx;
	}

	.title {
		color: #ffffff;
		font-weight: bold;
		line-height: 80rpx;
	}

	.moneyTxt {
		color: #ff4c4c;
		font-size: 42rpx;
		font-weight: bold;
		line-height: 120rpx;
	}

	.flexBet {
		font-size: 28rpx;
		line-height: 60rpx;
		color: #F4F4F4;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.borBottom {
		border-bottom: 2rpx #f4f4f4;
	}

	.footBox {
		display: flex;
		justify-content: space-between;
		padding: 60rpx 70rpx 0;
	}

	.btnClass {
		color: #FFFFFF;
		text-align: center;
		width: 260rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		font-weight: bold;
		border-radius: 20rpx;
	}

	.edit {
		background: #60cf64;
	}

	.del {
		background: #ff4c4c;
	}
</style>
