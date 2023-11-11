<template>
	<div class="content-box">
		<div class="container">
			<button @click="gasong">发送</button>
			<button @click="close">关闭</button>
			<button @click="open">打开</button>
			<view class="">
				{{data}}
			</view>
			<view class="">
				{{msgdata}}
			</view>
			<view class="">
				dfgjkdsjis动画VS开始了
			</view>
		</div>
	</div>
</template>

<script>
	import
	io
	from "socket.io-client";
	let socket = null;
	export default {
		data() {
			return {
				data: null,
				msgdata: "",
			};
		},
		mounted() {
			// 解决跨域问题
			socket = io("ws://60.204.219.215:9000", {
				transports: ["websocket"],
				autoConnect: true,
				withCredentials: true, //白名单
				extraHeaders: {
					"Access-Control-Allow-Origin": "http://localhost:8081",
				},
			});
			socket.on("data", (data) => {
				this.data = data;
				console.log(data);
			});
			socket.on("messagedata", (msg) => {
				this.msgdata = msg;
				console.log(msg)
			});
		},
		methods: {
			gasong() {
				socket.send("你好");
			},
			close() {
				socket.disconnect();
			},
			open() {
				socket.connect(); // 连接
			},
		},
	};
</script>

<style lang="scss" scoped></style>