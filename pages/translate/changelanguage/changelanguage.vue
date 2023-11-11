<template>
	<view>
		<uv-picker ref="picker" :columns="columns" @confirm="confirm"></uv-picker>
		<view class="item" v-if="isexit">
			当前语言：<text>{{name}}</text>
		</view>
		<view class="item" v-else>
			当前语言：<text>英语</text>
		</view>
		<button @click="openPicker">选择翻译语言</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isexit: false,
				name: '',
				columns: [
					["中文",
						"英语",
						"粤语",
						"文言文",
						"日语",
						"韩语",
						"法语",
						"西班牙语",
						"泰语",
						"阿拉伯语",
						"俄语",
						"葡萄牙语",
						"德语",
						"意大利语",
						"希腊语",
						"荷兰语",
						"波兰语",
						"保加利亚语",
						"爱沙尼亚语",
						"丹麦语",
						"芬兰语",
						"捷克语",
						"罗马尼亚语",
						"斯洛文尼亚语",
						"瑞典语",
						"匈牙利语",
						"越南语",
					]
				]
			}
		},
		onLoad() {
			this.getname()
		},
		methods: {
			getname() {
				let countryname = uni.getStorageSync('translatelanguage')
				if (countryname) {
					this.name = this.$getcountryname(JSON.parse(countryname))
					this.isexit = true
				} else {
					this.isexit = false
				}
			},
			openPicker() {
				this.$refs.picker.open();
			},
			confirm(e) {
				const name = this.$getcountryvalue(e.value[0].trim())
				console.log('confirm', name);
				uni.setStorageSync('translatelanguage', JSON.stringify(name))
				const update = true
				uni.$emit('updatetranslatelanguage', update)
				this.getname()
			}
		}
	}
</script>
<style lang="less" scoped>
	.item {
		width: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;

		text {
			color: springgreen
		}
	}
</style>