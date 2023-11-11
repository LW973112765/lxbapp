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
				// port: 9000,
				transports: ["websocket"],
				autoConnect: false,
				withCredentials: true, //白名单
				// extraHeaders: {
				// 	//请求头
				// 	"Access-Control-Allow-Origin": "http://localhost:8081",
				// },
			});
			socket.on("data", (data) => {
				this.data = data;
				console.log(data);
			});
			socket.on("messagedata", (msg) => {
				this.msgdata = msg;
				console.log(msg)
			});

			// 连接成功
			socket.on("connect", () => {
				console.log('监听客户端连接成功-connect');
			})
			// // 断开连接
			// socket.on("disconnect", (reason) => {
			// 	console.log(socket.connected);
			// 	console.log("断开连接-disconnect", reason);
			// })
			// // 错误
			// socket.on("error", (err) => {
			// 	console.log("错误-error", err);
			// })
			// // 连接错误
			// socket.on("connect_error", (err) => {
			// 	err
			// 	console.log("连接错误-connect_error");
			// });
			// // 连接超时
			// socket.on("connect_timeout", (data) => {
			// 	console.log("连接超时-connect_timeout", data);
			// });
			// // 重连成功
			// socket.on("reconnect", (attemptNumber) => {
			// 	// 重连尝试次数
			// 	console.log("重连成功-reconnect", attemptNumber)
			// });
			// // 尝试重连时触发
			// socket.on("reconnect_attempt", (attemptNumber) => {
			// 	// 重连尝试次数
			// 	console.log("尝试重连-reconnect_attempt", attemptNumber)
			// });
			// // 在尝试重新连接时触发
			// socket.on("reconnecting", (attemptNumber) => {
			// 	// 重连尝试次数
			// 	console.log("正在尝试重连-reconnecting", attemptNumber)
			// });
			// // 重连尝试错误
			// socket.on("reconnect_error", (err) => {
			// 	err
			// 	console.log(socket.connected);
			// 	console.log("重连尝试错误-reconnect_error");
			// });
			// // 客户端不能重连时触发
			// socket.on("reconnect_failed", () => {
			// 	console.log("客户端不能连接-reconnect_failed")
			// });
			// // 当一个ping被发送到服务器时触发
			// socket.on("ping", () => {
			// 	console.log("一个ping发送到服务器-ping")
			// });

			// // 当服务器收到pong时触发
			// socket.on("pong", (data) => {
			// 	// data: 延迟多少ms
			// 	console.log("服务器收到pong-pong", data);
			// });
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