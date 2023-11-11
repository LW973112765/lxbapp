## 组件使用方法
### 作者：ambler
* 组件参数
	* width number 展示图形码的宽度
	* height number 展示图形码的高度
	* codeShow number 初始值1 初始化canvas次数 用于触发canvas初始化
* 组件回调
	* error 错误回调
	* value input值回调  使用v-model直接接收绑定
* 使用示例
``` 
	父组件:
	<imgCodeInput ref="verCodes" v-model="visitForm.verCode" @error="canvasIdErrorCallback"></imgCodeInput>
					

	import imgCodeInput from "@/components/img-code-input/img-code-input.vue"
	export default {
		components: {
			imgCodeInput
		},
		data() {
			return {
				visitForm:{
					verCode:""
				},
			}
		},
		onShow() {
			let _this = this;
			setTimeout(function() {
				_this.$refs.verCodes.init()
			}, 500)
		},
		methods: {
			/**
			 * @param {Object} e
			 * 错误回调
			 */
			canvasIdErrorCallback(e) {
				console.error(e.detail.errMsg)
			},
		}
	}
```


``` 
    子组件:
	下载即可  u-input为uview组件 后期根据自己使用的ui框架更改u-input为其他组件
```