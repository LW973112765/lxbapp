import App from './App'
import request from "./utils/request.js"
import toolreq from "./utils/toolsreq.js"
import filesize from "./utils/filesize.js"
import time from "./utils/time.js"
import computedtime from "./utils/computedtime.js"
import computedtimetwo from "./utils/computedtimetwo.js"
import compare from "./utils/compare.js"
import noMultipleClicks from "./utils/noMultipleClicks.js"
import datachange from "./utils/datachange.js"
import MD5 from "./utils/MD5.js"
import {
	getcountryname,
	getcountryvalue
} from "./utils/language.js"
import {
	emojione,
	emojitwo
} from "./utils/emoji.js"
Vue.prototype.$emojione = emojione
Vue.prototype.$emojitwo = emojitwo
Vue.prototype.$zxl = request
Vue.prototype.$lw = toolreq
Vue.prototype.$filesize = filesize
Vue.prototype.$time = time
Vue.prototype.$MD5 = MD5
Vue.prototype.$getcountryname = getcountryname
Vue.prototype.$getcountryvalue = getcountryvalue
Vue.prototype.$computedtime = computedtime
Vue.prototype.$computedtimetwo = computedtimetwo
Vue.prototype.$compare = compare
Vue.prototype.$noMultipleClicks = noMultipleClicks
Vue.prototype.$datachange = datachange
import Vue from 'vue'
import GoEasy from './lib/goeasy-2.6.1.esm.min';
//使用声音音效
import music from './utils/music.js'
Vue.prototype.music = music
import './uni.promisify.adaptor'
// 自定义导航栏组件
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
// 将自定义导航栏组件注册为全局组件
Vue.component('uni-nav-bar', uniNavBar)
import uView from "@/uni_modules/uview-ui";
Vue.use(uView);
// 引入图标库
import "./static/fonts/iconfont.css";
//引入vuex
import Vuex from "vuex";
Vue.use(Vuex);
import store from "./store";
// let vuexStore = require("@/store/$u.mixin.js");
// Vue.mixin(vuexStore);
// 引入插件
import plugins from "./plugins/plugins.js";
Vue.use(plugins);
//登录持久化
//用户信息
let username = uni.getStorageSync("username");
if (username) {
	username = JSON.parse(username);
	store.commit("loginModule/setUser", username);
}

//用户聊天
let userchatinfo = uni.getStorageSync("userchatinfo");
if (userchatinfo) {
	userchatinfo = JSON.parse(userchatinfo);
	store.commit("UserChat/setUserChat", userchatinfo);
}
//网站背景
let bginfo = uni.getStorageSync("bginfo");
if (bginfo) {
	bginfo = JSON.parse(bginfo);
	store.commit("bgColor/setBg", bginfo);
}
Vue.config.productionTip = false
App.mpType = 'app'
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const msgSuccess = (title, duration = 1500, mask = false, icon = 'success') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.prototype.$fire = new Vue();
Vue.prototype.$api = {
	msg,
	msgSuccess
};
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$version = '版本号: 1.0.032301';


const app = new Vue({
	...App,
	store
})
app.$mount()
const goEasy = GoEasy.getInstance({
	host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
	appkey: 'BC-ee05b5dadb264cba92c851e5fa0666ef', // common key,
	modules: ['im'],
	// true表示支持通知栏提醒，false则表示不需要通知栏提醒
	allowNotification: false //仅有效于app,小程序和H5将会被自动忽略
});

goEasy.onClickNotification((message) => {
	let currentUrl;
	const routes = getCurrentPages();

	if (routes && routes.length) {
		const curRoute = routes[routes.length - 1].route;
		const curParam = routes[routes.length - 1].options;
		currentUrl = '/' + curRoute + `?to=${curParam.to}`;
	}

	let newUrl;
	switch (message.toType) {
		case GoEasy.IM_SCENE.PRIVATE:
			newUrl = '/pages/chat/privateChat/privateChat?to=' + message.senderId;
			break;
		case GoEasy.IM_SCENE.GROUP:
			newUrl = '/pages/chat/groupChat/groupChat?to=' + message.groupId;
			break;
	}

	if (currentUrl !== newUrl) {
		uni.navigateTo({
			url: newUrl,
		});
	}

});

Vue.prototype.GoEasy = GoEasy;
Vue.prototype.goEasy = goEasy;

Vue.prototype.formatDate = function(t) {
	t = t || Date.now();
	let time = new Date(t);
	let str = time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
	str += '-';
	str += time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
	str += ' ';
	str += time.getHours();
	str += ':';
	str += time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
	return str;
};
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}