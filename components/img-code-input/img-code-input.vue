<template>
	<view class="codeView">
		<input v-model="verCode" style="font-size: 35rpx;" type="text" maxlength="4" placeholder="请输入右边验证码" @input="sendCode" />
		<view class="canvas-img-code" @click="refresh()">
			<canvas :style="{width:(canvasW?canvasW+15:145)+'px',height:(canvasH?canvasH:35)+'px'}"
				canvas-id="imgcanvas" @error="canvasIdErrorCallback"></canvas>
		</view>
	</view>
</template>

<script>
	export default {
		name: "imgCodeInput",
		data() {
			return {
				canvasW: 112,
				canvasH: 35,
				verCode: "",
				code:''
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			// 初始化验证码
			init() {
				console.log('start');
				let context = uni.createCanvasContext('imgcanvas', this)
				let w = this.canvasW
				let h = this.canvasH
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q", "R",
						"S",
						"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				this.code=str
				uni.setStorage({  
					key: 'imgcode',
					data: str,
				});
				this.verCode = ""
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			/**
			 * @param {Object} min
			 * @param {Object} max
			 * 随机颜色
			 */
			rc(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			/**
			 * @param {Object} max
			 * @param {Object} min
			 * 随机验证码
			 */
			rn(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			/**
			 * 刷新
			 */
			refresh() {
				this.init();
			},
			/**
			 * @param {Object} e
			 * 错误回调
			 */
			canvasIdErrorCallback(e) {
				this.$emit("error", e.detail.errMsg)
			},
			/**
			 * 输出输入框内容
			 */
			sendCode() {
				let obj={
					verCode:this.verCode,
					code:this.code
				}
				this.$emit('input', obj)
			},
		},
	}
</script>

<style lang="scss">
	.codeView {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.canvas-img-code {
			display: inline-block;
			border: 1px solid #dddddd;
			border-radius: 5px;
			overflow: hidden;
		}

		/deep/ uni-input {
			font-size: 14px;
		}

		.uni-input-placeholder {
			color: rgb(192, 196, 204);
		}
	}
</style>
