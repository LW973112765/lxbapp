<template>
	<view>
		<view class="word" :style="style_box" v-if="data.type==1">
			{{data.url}}
		</view>
		<image v-if="data.type==2" :src="data.url" mode="" style="width: 750rpx;height: 500rpx;"></image>
		<video v-if="data.type==3" vslide-gesture enable-play-gesture show-mute-btn vslide-gesture="true" :title="title"
			autoplay id="myVideo" style="width: 100%;height: 400rpx;" :src="data.url" vslide-gesture-in-fullscreen
			enable-danmu danmu-btn controls>
		</video>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				uuid: '',
				data: [],
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
			};
		},
		onLoad(e) {
			// console.log(JSON.parse(e.data), '收到参数')
			let data = JSON.parse(e.data)
			this.uuid = data.uuid
			this.getinfo()

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
		methods: {
			async getinfo() {
				let res = await this.$zxl('/getmakecode', {
					uuid: this.uuid
				})
				if (res.data.status == 200) {
					console.log(res.data, '结果')
					this.data = res.data.data[0]
					uni.setNavigationBarTitle({
						title: res.data.data[0].title
					})
				} else {
					this.data = []
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		position: relative;
		width: 750rpx;
		margin-top: 100rpx;
		height: 500rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		// background-color: red;

		.errorimg {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
	}

	.word {
		position: relative;
		margin-top: 20rpx;
		font-size: 40rpx;
		padding: 20rpx;
		color: transparent;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		-webkit-animation: slide1 2s infinite linear;
		animation: slide1 5s infinite linear;
	}
</style>