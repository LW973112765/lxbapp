<template>
	<view @click="setShowkey()">
		<!-- 收支类型 -->
		<view class="headNav">
			<text @click.stop="setType(0)" :class="{'navActive':statusPay == 0}">支出</text>
			<text @click.stop="setType(1)" :class="{'navActive':statusPay == 1}">收入</text>
			<view class="navLine" :style="{'left':lineLeft}"></view>
		</view>

		<!-- 金额 -->
		<view class="inputBox">
			<view class="alignItems">
				<u-icon name="rmb-circle" size="26" color="#ffd607"></u-icon>
				<u-icon name="arrow-right" size="20" color="#ffd607"></u-icon>
			</view>
			<text @click.stop="showkey = true"
				style="min-width: 200rpx;text-align: right;flex: 1;">￥{{money?money:'0.00'}}</text>
		</view>

		<!-- 分类选择 -->
		<view>
			<!-- 支出类别 -->
			<view v-show="statusPay == 0" class="typeTitle">
				<text @click="setKind(0)" :class="{'typeActive':kindNav == 0}">食品饮料</text>
				<text @click="setKind(1)" :class="{'typeActive':kindNav == 1}">衣裤鞋帽</text>
				<text @click="setKind(2)" :class="{'typeActive':kindNav == 2}">居家生活</text>
				<text @click="setKind(3)" :class="{'typeActive':kindNav == 3}">交通游玩</text>
			</view>
			<!-- 收入类别 -->
			<view v-show="statusPay == 1" class="typeTitle">
				<text @click="setKind(4)" :class="{'typeActive':kindNav == 4}">收入</text>
			</view>
			<!-- 转账类别 -->
			<view v-show="statusPay != 2" class="typeBox">
				<view class="selectKind" :style="selKindClass">
					<view class="fillUp"></view>
				</view>
				<view @click="setKindBox(index)" v-for="(item,index) in list[kindNav]" :key="index" class="kindBox">
					<image :src="item.img" class="kindImg" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>

		<!-- 时间以及备注 -->
		<view class="footBox">
			<view @click="showPicker = true" class="footBoxleft">
				<u-icon name="calendar" size="28"></u-icon>
				<text class="timeTitle">{{addBillTime}}</text>
			</view>
			<input type="text" v-model="remark" placeholder="输入备注内容...">
		</view>

		<!-- 键盘 -->
		<view v-show="showkey" class="keyboardBox">
			<view v-for="(item,index) in keyboardList" :key="index" class="flexColumn">
				<view @click.stop="countMoney(itemTwo)" v-for="itemTwo in item" :key="itemTwo">{{itemTwo}}</view>
			</view>
			<view class="flexColumn">
				<view @click.stop="delMoney(1)" style="height: 100rpx;">
					<u-icon name="backspace" color="#FFFFFF" size="28"></u-icon>
				</view>
				<view @click.stop="delMoney(2)">C</view>
				<view @click="readyBtn()" class="keyBtn">确定</view>
			</view>
		</view>

		<!-- 按钮 -->
		<view @click="updateBtn()" v-if="isUpdate" class="updateClass">
			修改
		</view>
		<view v-else class="lastBtn">
			<view @click="addBtn(1)" class="footBtn left">
				再记一笔
			</view>
			<view @click="addBtn(0)" class="footBtn right">
				保存
			</view>
		</view>

		<u-datetime-picker ref="datetimePicker" :show="showPicker" v-model="datetime" :formatter="formatter"
			mode="datetime" @cancel="showPicker = false" @confirm="setAddTime"></u-datetime-picker>
	</view>
</template>

<script>
	import moment from "moment";
	export default {
		data() {
			return {
				accid: '',
				isUpdate: false,
				yearTime: '',
				monthTime: '',
				remark: '',
				bookList: '',
				showPicker: false,
				datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
				addBillTime: '现在',
				showkey: true, // 数字键盘
				money: '',
				selKindClass: "left:-100px;top:0;",
				lineLeft: '216rpx',
				statusPay: 0, // 0支出、1收入、2转账moment().format("YYYY-MM-DD HH:mm:ss")
				kindNav: 0, // 分类
				list: [
					// 食品分类
					[{
						"img": "/static/icon/food01.png",
						"name": "早中晚餐",
						"id": 1
					}, {
						"img": "/static/icon/food02.png",
						"name": "饮料",
						"id": 2
					}, {
						"img": "/static/icon/food03.png",
						"name": "蔬菜",
						"id": 3
					}, {
						"img": "/static/icon/food04.png",
						"name": "零食",
						"id": 4
					}, {
						"img": "/static/icon/other.png",
						"name": "其他",
						"id": 5
					}],
					// 衣物分类
					[{
						"img": "/static/icon/dress01.png",
						"name": "衣服",
						"id": 6
					}, {
						"img": "/static/icon/dress02.png",
						"name": "鞋子",
						"id": 7
					}, {
						"img": "/static/icon/dress03.png",
						"name": "帽子",
						"id": 8
					}, {
						"img": "/static/icon/dress04.png",
						"name": "首饰",
						"id": 9
					}, {
						"img": "/static/icon/other.png",
						"name": "其他",
						"id": 10
					}],
					// 居家分类
					[{
						"img": "/static/icon/home01.png",
						"name": "日常用品",
						"id": 11
					}, {
						"img": "/static/icon/home02.png",
						"name": "厨房用品",
						"id": 12
					}, {
						"img": "/static/icon/home03.png",
						"name": "床上用品",
						"id": 13
					}, {
						"img": "/static/icon/home04.png",
						"name": "电器用品",
						"id": 14
					}, {
						"img": "/static/icon/other.png",
						"name": "其他",
						"id": 15
					}],
					// 游玩分类
					[{
						"img": "/static/icon/play01.png",
						"name": "交通费",
						"id": 16
					}, {
						"img": "/static/icon/play02.png",
						"name": "油费",
						"id": 17
					}, {
						"img": "/static/icon/play03.png",
						"name": "娱乐",
						"id": 18
					}, {
						"img": "/static/icon/other.png",
						"name": "其他",
						"id": 19
					}],
					// 支出分类
					[{
						"img": "/static/icon/outlay01.png",
						"name": "工资",
						"id": 20
					}, {
						"img": "/static/icon/outlay02.png",
						"name": "兼职",
						"id": 21
					}, {
						"img": "/static/icon/outlay03.png",
						"name": "福利",
						"id": 22
					}, {
						"img": "/static/icon/other.png",
						"name": "其他",
						"id": 23
					}]
				],
				// 键盘
				keyboardList: [
					['1', '4', '7', '.'],
					['2', '5', '8', '0'],
					['3', '6', '9', '00']
				]
			}
		},
		onLoad(option) {
			if (option.type == 'update') {
				this.isUpdate = true
			}
		},
		onReady() {
			// this.bookList = uni.getStorageSync('bookList')
			if (this.isUpdate) {
				let listAcc = uni.getStorageSync('detailAcc')
				this.setType(listAcc.statusPay)
				this.accid = listAcc.id
				this.money = listAcc.money
				this.typeStatu = listAcc.typeStatu
				this.remark = listAcc.remark
				this.yearTime = listAcc.year
				this.monthTime = listAcc.month
				this.datetime = listAcc.datetime
				this.addBillTime = uni.$u.date(listAcc.datetime, 'mm-dd')
				// 设置选择框
				this.list.map((kindVal, kindIndex) => {
					kindVal.map((typeValue, index) => {
						if (typeValue.id == this.typeStatu) {
							this.kindNav = kindIndex
							this.setKindBox(index)
							return
						}
					})
				})

			} else {
				this.$refs.datetimePicker.setFormatter(this.formatter)
				this.yearTime = uni.$u.date(this.datetime, 'yyyy')
				this.monthTime = uni.$u.date(this.datetime, 'mm')
			}

		},
		methods: {
			updateBtn() {
				let accName = this.yearTime + '-' + this.monthTime
				
				let arrList = uni.getStorageSync(accName)
				
				console.log(arrList)
				
				let arrAry = {
					id: this.accid,
					money: this.money,
					statusPay: this.statusPay,
					typeStatu: this.typeStatu,
					remark: this.remark,
					month:this.monthTime,
					year:this.yearTime,
					datetime: this.datetime,
				}
				
				
				let newAllMoney = 0
				arrList.list.map(arr => {
					if(arr.id == this.accid){
						arr.money = this.money,
						arr.statusPay = this.statusPay,
						arr.typeStatu = this.typeStatu,
						arr.remark = this.remark,
						arr.month =this.monthTime,
						arr.year =this.yearTime,
						arr.datetime = this.datetime
					}
					if(arr.statusPay == 0){
						newAllMoney =  newAllMoney  + parseInt(arr.money) 
					}else{
						newAllMoney =  newAllMoney  - parseInt(arr.money) 
					}
					
				})
				arrList.allMoney = newAllMoney
				uni.setStorageSync(accName, arrList)
				this.$u.toast('修改成功')
				setTimeout(() => {
					uni.navigateBack()
				}, 1200)
			},
			addBtn(isAgain) {
				// 本地存储数据
				if(!this.money){
					this.$u.toast('请输入记账金额')
				}
				else if(!this.typeStatu){
					this.$u.toast('请选择记账类型')
				}
				else{
					let accName = this.yearTime + '-' + this.monthTime
					
					let Pid = parseInt(uni.getStorageSync('idMax') || '0') || 0
					Pid++;
					
					uni.setStorageSync('idMax', Pid.toString())
					
					let arrAry = {
						id: Pid,
						money: this.money,
						statusPay: this.statusPay,
						typeStatu: this.typeStatu,
						remark: this.remark,
						datetime: this.datetime,
						month:this.monthTime,
						year:this.yearTime,
					}
					
					let arrList = uni.getStorageSync(accName) || {'allMoney':0,'list':[]}
					arrList.list.push(arrAry)
					if(this.statusPay == 0){
						arrList.allMoney =  parseInt(arrList.allMoney)  + parseInt(this.money) 
					}else{
						arrList.allMoney =  parseInt(arrList.allMoney)  - parseInt(this.money) 
					}
					
					uni.setStorageSync(accName, arrList)
					this.$u.toast('记录成功')
					if(isAgain == 0){
						setTimeout(() => {
							uni.navigateBack()
						}, 1200)
					}
				}

			},
			setAddTime(e) {
				this.yearTime = uni.$u.date(e.value, 'yyyy')
				this.monthTime = uni.$u.date(e.value, 'mm')
				this.addBillTime = uni.$u.date(e.value, 'mm-dd')
				
				this.showPicker = false
			},
			// 选择框过滤器
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				if (type === 'hour') {
					return `${value}时`
				}
				if (type === 'minute') {
					return `${value}分`
				}
				return value
			},
			setShowkey() {
				this.showkey = false
			},
			// 收支下方横条
			setType(stu) {
				this.showkey = true
				this.statusPay = stu
				this.lineLeft = stu * 220 + 216 + 'rpx'
				if (this.statusPay == 0) {
					this.setKind(0)
				} else if (stu == 1) {
					this.setKind(4)
				}
			},
			// 类别选择
			setKind(index) {
				this.selKindClass = "left:-100px;top:0;"
				this.kindNav = index
			},
			// 类别选择框
			setKindBox(index) {
				this.typeStatu = this.list[this.kindNav][index].id
				this.showkey = false
				var topSum = parseInt(index / 4)
				var leftSum = parseInt(index % 4)
				this.selKindClass = "left:" + (leftSum * 172 + 30) + "rpx;top:" + (topSum * 160) + "rpx;"
			},

			// 输入数字
			countMoney(sum) {
				// 小数点
				this.money += sum
			},
			// 删除
			delMoney(stu) {
				if (stu == 2) {
					this.money = ''
				} else {
					var newMoney = this.money.substr(0, this.money.length - 1)
					this.money = newMoney
				}
			},
			// 确定
			readyBtn() {
				this.showkey = false
			},
		}
	}
</script>

<style>
	.headNav {
		position: relative;
		display: flex;
		color: #999999;
		justify-content: center;
	}

	.navLine {
		position: absolute;
		bottom: 0;
		width: 100rpx;
		height: 10rpx;
		background: #ffd607;
		border-radius: 10rpx;
		transition: ease-out 0.4s;
	}

	.headNav text {
		font-weight: bold;
		text-align: center;
		width: 220rpx;
		line-height: 80rpx;
		transition: ease-out 0.4s;
	}

	.navActive {
		color: #333;
	}

	.typeImg {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.inputBox {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		font-weight: bold;
		line-height: 120rpx;
	}

	.alignItems {
		display: flex;
		align-items: center;
	}



	.selectType {
		font-size: 26rpx;
		position: absolute;
		top: 120rpx;
		line-height: 60rpx;
		background: #FFFFFF;
		padding: 10rpx 20rpx;
		border: 4rpx #F4F4F4 solid;
		z-index: 10;
	}

	.selectType .alignItems text {
		width: 100rpx;
		text-align: center;
	}

	.triangle {
		position: absolute;
		left: 72rpx;
		top: -20rpx;
		width: 40rpx;
		height: 40rpx;
		background: #FFFFFF;
		transform: rotate(-135deg);
		box-shadow: 4rpx 4rpx 4rpx #F4F4F4;
	}

	.typeTitle {
		display: flex;
		line-height: 60rpx;
		color: #999999;
		border-top: 20rpx #F4F4F4 solid;
	}

	.typeTitle text {
		width: 25%;
		line-height: 80rpx;
		text-align: center;
	}

	.typeActive {
		color: #333;
		font-weight: bold;
	}


	.typeBox {
		position: relative;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx 30rpx 30rpx;
		border-bottom: 20rpx #F4F4F4 solid;
	}

	.kindBox {
		width: 172rpx;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 1;
	}

	.fillUp {
		width: 156rpx;
		height: 144rpx;
		border-radius: 0 10rpx 0 10rpx;
		background: #FFFFFF;
	}

	.selectKind {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 172rpx;
		height: 160rpx;
		background: linear-gradient(45deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4, #f441a5);
		background-size: 400%;
		border-radius: 0 10rpx 0 10rpx;
		filter: blur(2px);
		animation: animate 8s linear infinite;
		transition: ease-out 0.4s;
	}

	@keyframes animate {
		0% {
			background-position: 0%;
		}

		100% {
			background-position: 400%;
		}
	}

	.kindImg {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 8rpx;
	}

	.footBox {
		display: flex;
		padding: 0 30rpx;
		line-height: 80rpx;
	}

	.footBoxleft {
		display: flex;
		align-items: center;
	}

	.footBox input {
		display: block;
		flex: 1;
		height: 80rpx;
	}

	.timeTitle {
		font-weight: bold;
		width: 160rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.keyboardBox {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		background: #474669;
		color: #FFFFFF;
		font-weight: bold;
		padding: 10rpx 0 60rpx 0;
	}

	.flexColumn {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 100rpx;
	}

	.flexColumn view {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.flexColumn view:hover {
		background: #656496;
	}

	.keyBtn {
		width: 100%;
		text-align: center;
		background: #616593;
		line-height: 200rpx;
	}


	.lastBtn {
		padding: 80rpx 30rpx 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.lastBtn .left {
		color: #ff8e07;
		border: 4rpx #ff8e07 solid;
		border-radius: 20rpx;
	}

	.lastBtn .right {
		color: #333333;
		background: #ffd608;
		border-radius: 20rpx;
	}

	.footBtn {
		text-align: center;
		width: 300rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		font-weight: bold;
	}

	.updateClass {
		margin: 80rpx auto 0;
		color: #333333;
		text-align: center;
		width: 300rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		font-weight: bold;
		background: #ffd608;
		border-radius: 20rpx;
	}
</style>
