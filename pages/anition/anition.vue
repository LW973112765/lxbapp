<template>
	<view>
		<view class="example-body">
			<button @click="open(['fade','zoom-out','slide-top'])">组合动画示例一</button>
			<button @click="open(['zoom-in','slide-bottom','fade'])">组合动画示例二</button>
			<button @click="open(['slide-left','slide-top','fade'])">组合动画示例三</button>
		</view>
		<uni-transition :mode-class="modeClass" :styles="transfromClass" :show="transShow" @click="onTap"
			:duration="500">
			<text style="color: #fff;padding: 40px;background-color: #4CD964;">Test</text>
		</uni-transition>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				transShow: false,
				modeClass: ['fade'],
				maskClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					'background-color': 'rgba(0, 0, 0, 0.4)',
				},
				transfromClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					'display': 'flex',
					'justify-content': 'center',
					'align-items': 'center'
				}
			}
		},
		onLoad() {},
		methods: {
			open(mode) {
				this.modeClass = mode
				this.transShow = !this.transShow
			},
			onTap() {
				this.transShow = this.show = false
			}
		}
	}
</script>