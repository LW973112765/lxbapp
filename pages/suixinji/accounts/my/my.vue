<template>
	<view>
		<!-- 头像 -->
		<!-- @click="openUrl('/pages/my/set')" -->
		<view class="headBox">
			<image :src="userinfo.avatar" class="avatarImg" mode=""></image>
			<view v-show="!updatebudget" class="headContent">
				本月预算：{{name}}
			</view>
			<u-icon @click="updatebudget = true" v-show="!updatebudget" name="edit-pen-fill" color="#FFFFFF" size="28"></u-icon>
			
			<view v-show="updatebudget" class="headContent">
				<input v-model="newName" :placeholder="name" placeholder-style="color:#f4f4f4" type="number">
			</view>
			<view v-show="updatebudget" @click="savebudget" class="saveBtn">
				保存
			</view>
			
		</view>
		<view class="line-box">
			<qiun-data-charts type="line" :eopts="lineOption" :chartData="lineData" :echartsH5="true"
				:echartsApp="true">
			</qiun-data-charts>
		</view>
		<view class="pie-box">
			<qiun-data-charts type="pie" :eopts="pieOption" :chartData="pieData" :echartsH5="true" :echartsApp="true" />
		</view>
		<view style="height: 200rpx;"></view>

		<foo-bar @toIndex="toIndex"  :home="1"></foo-bar>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" title="警告" content="该操作会清空您的账单数据,是否继续？" @confirm="dialogConfirm"
					></uni-popup-dialog>
			</uni-popup>
		</view>
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose"  mode="input" title="输入密码" 
					placeholder="请输入登录密码" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	import fooBar from "@/components/fooBar/fooBar.vue"
	import typeStatu from '../../../../static/typeStatu.json'

	export default {
		components: {
			fooBar
		},
		data() {
			return {
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				updatebudget:false,
				name: '',
				newName:'',
				lineData: {
					categories: [],
					series: [{
						smooth: true,
						itemStyle: {
							normal: {
								label: {
									show: true,
									color: '#FFFFFF',
								}
							}
						},
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: '#1890FF' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#323b42' // 100% 处的颜色
								}],
								global: false // 缺省为 false
							}
						},
						'data': []
					}]
				},
				lineOption: {
					title: {
						text: '本月支出',
						textStyle: {
							color: '#FFFFFF',
							fontSize: 14,
						}
					},
					xAxis: {
						boundaryGap: false,
						axisLabel: {
							color: '#FFFFFF'
						},
					},
					yAxis: {
						show: false,
						axisLabel: {
							color: '#FFFFFF'
						},
						splitLine: {
							show: false
						}
					},
					dataZoom: [{
						type: "inside", // 内嵌入图标中
						minValueSpan: 3, //用于限制窗口大小的最小值
						endValue: 4,
						filterMode: 'filter',
					}],
				},
				pieData: {
					"series": [{
						"itemStyle": {
							normal: {
								label: {
									show: true,
									color: '#FFFFFF',
								}
							}
						},
						"data": []
					}]
				},
				pieOption: {
					title: {
						text: '本月支出类型',
						textStyle: {
							color: '#FFFFFF',
							fontSize: 14,
						}
					},
					legend: {
						show: false
					}
				},
				yearTime: '',
				monthTime: '',
				typeList: typeStatu,
			}
		},
		computed: {
		  ...mapState("loginModule", ["userinfo"]),
		},
		onLoad() {
			uni.hideTabBar()
			this.yearTime = uni.$u.date(Date.parse(new Date()), 'yyyy')
			this.monthTime = uni.$u.date(Date.parse(new Date()), 'mm')
		},
		onShow() {
			this.name = uni.getStorageSync('budget') ||  "2000"
			this.getBook()
		},
		methods: {	
			messageToggle(type,zxl) {
				this.msgType = type
				this.messageText = zxl
				this.$refs.message.open()
			},
			dialogInputConfirm(val) {
				if(val==this.userinfo.password){
					uni.showLoading({
						title: '正在清理数据...'
					})
					const res = uni.getStorageInfoSync().keys;
					const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
					const result = res.filter((str) => regex.test(str));
					 result.forEach(item=>{
						 uni.removeStorageSync(item)
					 })
					console.log(result);
					setTimeout(() => {
						uni.hideLoading()
						this.$refs.inputDialog.close()
						this.getBook()
						this.messageToggle('success','已清空数据')
					}, 1000)
				}
				else{
					this.messageToggle('warn','密码错误，请重试')
				}
					
			},
			onNavigationBarButtonTap(e){
			// uni.removeStorageSync('liulanjilu')
			this.dialogToggle('warn')
		},
		dialogToggle(type) {
			this.msgType = type
			this.$refs.alertDialog.open()
		},
		dialogConfirm() {
			this.$refs.inputDialog.open()
		},
			// 保存名字
			savebudget(){
				this.name = this.newName
				uni.setStorageSync('budget',this.newName)
				this.updatebudget = false
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
						if (val1 < val2) return -1;
						else if (val1 > val2) return 1;
						else return 0;
					}
				}
				resList.sort(orderBy('datetime'));

				// 取到两个数组，第一个日期和支出金额（用天做单位）。第二个类型和支出金额。
				let lineArr = []; //线性图数组
				let pieArr = []; // 饼状图数组
				resList.map(accValue => {
					accValue['title'] = uni.$u.date((accValue.datetime), 'dd日')

					let lineRes = lineArr.some(item => { //判断相同日期标题，有就添加到当前项
						if (item.title == accValue.title) {
							item.moneyPay = accValue.statusPay == 0 ? (item.moneyPay + parseInt(accValue
								.money)) : item.moneyPay
							return true
						}
					})
					if (!lineRes) {
						lineArr.push({
							title: accValue.title,
							'moneyPay': accValue.statusPay == 0 ? parseInt(accValue.money) : 0
						})
					}


					this.typeList.map(typeValue => {
						if (typeValue.id == accValue.typeStatu) {
							accValue['name'] = typeValue.name
						}
					})

					let pieRes = pieArr.some(item => { //判断相同类型，有就添加到当前项
						if (item.type == accValue.name) {
							item.moneyPay = accValue.statusPay == 0 ? (item.moneyPay + parseInt(accValue
								.money)) : item.moneyPay
							return true
						}
					})
					if (!pieRes) {
						pieArr.push({
							"type": accValue.name,
							'moneyPay': accValue.statusPay == 0 ? parseInt(accValue.money) : 0
						})
					}
				})

				this.lineData.categories = []
				this.lineData.series[0].data = []
				lineArr.map(value => {
					this.lineData.categories.push(value.title)
					this.lineData.series[0].data.push(value.moneyPay)
				})
				this.pieData.series[0].data = []
				pieArr.map(value => {
					if(value.moneyPay != 0){
						this.pieData.series[0].data.push({
							"name": value.type,
							"value": value.moneyPay
						})
					}
				})

			},

		
			toIndex(index) {
				if (index == 0) {
					uni.navigateTo({
						url: "/pages/suixinji/accounts/home/home",
						animationType:'zoom-fade-out'
					})
				} else if (index == 1) {
					
				} else if (index == 2) {
					uni.navigateTo({
						url: "/pages/suixinji/accounts/addAcc/addAcc",
						animationType:'zoom-fade-out'
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #242a2f;
	}

	.headBox {
		display: flex;
		align-items: center;
		padding: 80rpx 30rpx;
		background: #252427;
	}

	.avatarImg {
		height: 140rpx;
		width: 140rpx;
		border-radius: 80rpx;
	}

	.headContent {
		margin-left: 20rpx;
		font-size: 26rpx;
		flex: 1;
		color: #FFFFFF;
		line-height: 80rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.headContent input{
		color: #FFFFFF;
	}
	
	.saveBtn{
		width: 120rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
	}

	.footBox {
		margin-top: -50rpx;
		border-radius: 50rpx;
		background: #242a2f;
	}

	.navBox {
		color: #FFFFFF;
		display: flex;
		padding: 50rpx 20rpx;
	}

	.navItem {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.navTitle {
		line-height: 60rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.navTxt {
		font-size: 26rpx;
		color: #999999;
	}

	.navImg {
		width: 80rpx;
		height: 80rpx;
	}

	.listClass {
		padding: 30rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx #F7F7F7 solid;
	}

	.listTxt {
		flex: 1;
		font-size: 32rpx;
		font-weight: bold;
		margin-left: 20rpx;
	}

	.line-box {
		padding: 30rpx 0;
		width: 96%;
		height: 200px;
	}

	.pie-box {
		width: 100%;
		height: 300px;
	}
</style>
