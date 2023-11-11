<template>
	<view>
		<marquee :list="list" 
		:themeColor="themeColor" 
		:bgColor="bgColor" 
		:bg_sd_Color="bg_sd_Color" 
		@result="result" 
		:theme_img_bg="theme_img_bg" 
		:is_img_bg="is_img_bg"
		:box_shadow_Color="box_shadow_Color"
		:bg_img="bg_img"
		:stay_index="stay_index"></marquee>
		
			<slot></slot>
		</blowAny>
	</view>
</template>

<script>
	import marquee from './marquee.vue';
	export default {
		components: {
			marquee,
		
		},
		props: {
		
			list: {
				type: Array,
				default () {
					return []
				}
			},
			
			themeColor: {
				type: String,
				default: '#33CCCC',
			},
			btn_Color: {
				type: String,
				default: '#ffffff',
			},
			seled_Color: {
				type: String,
				default: '#f43f3b',
			},
			seled_t_Color: {
				type: String,
				default: '#98FB98',
			},
			
			
	
			bgColor: {
				type: String,
				default: '#1E90FF',
			},
			bg_sd_Color: {
				type: String,
				default: '#4169E1',
			},
			
			//停留位置
			stay_index :{
				type: Number,
				default: 1
			},
			percentage : { //刮开百分之多少的时候开奖
				type : Number ,
				default : 45 
			},
		
	
			//跑马灯启用图片背景
			is_img_bg: { 
				type: Boolean,
				default: false
			},
			//背景图片
			theme_img_bg: {
				type: String,
				default: '',
			},
			box_shadow_Color: {
				type: String,
				default: '#fcc8d0',
			},
			//底部背景图片
			bg_img: {
				type: String,
				default: '',
			},
			//翻牌选中的图片背景
			seled_img: {
				type: String,
				default: '',
			},
			//翻牌未选中的图片背景
			un_seled_img: {
				type: String,
				default: '',
			},
		},
		
		methods: {
			result(e){
				this.$emit('result', e);
			},
		
		},
	}
</script>

<style lang="scss">

</style>
