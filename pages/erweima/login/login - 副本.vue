<template>
	<view class="yuanqi-qrcode">
		<yuanqi-qr-code ref="yuanqiQRCode" :fileType="fileType" :correctLevel="correctLevel" :size="size"
			@onPainted='onPainted' @onMakeImged='onMakeImged' :borderSize="borderSize" :bgImg="bgImg" :color="color"
			:bgColor="bgColor" :text="text"></yuanqi-qr-code>
		<view class="controller">
			<view class="title">
				<text>参数</text>
			</view>
			<view class="row">
				<text>内容：</text>
				<view class="row-right">
					<input type="text" v-model="text" placeholder="内容" />
				</view>
			</view>
			<view class="row">
				<text>Logo：</text>
				<view class="row-right">
					<input type="text" v-model="logo" placeholder="logo Url" />
				</view>
				<button type="warn" size="mini" @click="chooseLogo">选择LOGO</button>
			</view>
			<view class="row">
				<text>背景图片：</text>
				<view class="row-right">
					<input type="text" v-model="bgImg" placeholder="bgImg Url" />
				</view>
				<button type="primary" size="mini" @click="chooseBgImg">选择背景图片</button>
			</view>
			<view class="row">
				<view class="row">
					<text>前景颜色：</text>
					<view class="row-right">
						<input type="text" v-model="color" placeholder="前景颜色" />
					</view>
				</view>
				<view class="row">
					<text>背景颜色：</text>
					<view class="row-right">
						<input type="text" v-model="bgColor" placeholder="背景颜色" />
					</view>
				</view>
			</view>
			<view class="row">
				<text>容错等级：</text>
				<view class="row-right">
					<picker mode="selector" :value="correctLevel" :range="correctLevelList"
						@change="correctLevelChange">
						<view>{{correctLevel}}</view>
					</picker>
				</view>

			</view>
			<view class="row">
				<text>输出图片格式：</text>
				<view class="row-right">
					<picker mode="selector" :value="fileTypeList.indexOf(fileType)" :range="fileTypeList"
						@change="fileTypeChange">
						<view>{{fileTypeList[fileTypeList.indexOf(fileType)]}}</view>
					</picker>
				</view>
			</view>
			<view class="row">
				<text>二维码大小：</text>
				<view class="row-right">
					<slider max="680" :value="size" :show-value="true" @change="sizeChange" />
				</view>

			</view>
			<view class="row">
				<text>边框大小：</text>
				<view class="row-right">
					<slider max="60" :show-value="true" :value="borderSize" @change="borderSizeChange" />
				</view>
			</view>
		</view>
		<button type="default" @click="make">生成</button>
		<button type="default" @click="save">保存到相册</button>
		<button type="default" @click="clear">清除</button>
		<button type="default" @click="test">生成多个二维码演示</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: "https://uniapp.dcloud.net.cn",
				size: 256,
				logo: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9a952c80-6080-11eb-a16f-5b3e54966275.png",
				bgColor: "#FFFFFF",
				color: "#474735",
				correctLevel: "H",
				correctLevelListIndex: 3,
				borderSize: 90,
				// bgImg: "http://lwandzxl.top/1683379616136mmexport1601864100866.jpg",
				bgImg: "",
				fileType: "png",
				fileTypeList: ['png', 'jpg'],
				correctLevelList: ["L(7%)", "M(15%)", "Q(25%)", "H(30%)"]
			};
		},
		methods: {
			test() {
				uni.navigateTo({
					url: '/pages/mulit/mulit'
				})
			},
			save() {
				this.$refs.yuanqiQRCode.save()
			},
			make() {
				this.$refs.yuanqiQRCode.make()
			},
			clear() {
				this.$refs.yuanqiQRCode.clear()
			},
			correctLevelChange(e) {
				const index = e.detail.value
				this.correctLevel = this.correctLevelList[index].charAt(0)
				this.correctLevelListIndex = index
			},
			fileTypeChange(e) {
				this.fileType = this.fileTypeList[e.detail.value]
			},
			sizeChange(e) {
				this.size = e.detail.value
			},
			borderSizeChange(e) {
				this.borderSize = e.detail.value
			},
			chooseLogo() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.logo = res.tempFilePaths[0]
					}
				})
			},
			chooseBgImg() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.bgImg = res.tempFilePaths[0]
					}
				})
			},
			onPainted() {

			},
			onMakeImged(e) {

			}
		}
	}
</script>

<style lang="scss">
	.title {
		text-align: center;
		background-color: #333;
		color: #fff;
		font-size: 18px;
		padding: 5px;
		margin-top: 5px;
	}

	.row {
		display: flex;
		flex-direction: row;
		margin: 5px;
		border-bottom: 1px solid #999;

		&-right {
			flex: 1;
			padding: 0 5px;
			margin: 0 10px;
		}
	}
</style>