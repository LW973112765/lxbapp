// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		// http://8.142.10.182:8090 
		config.baseURL = 'https://www.bylpersonal.top';
		// config.baseURL = 'http://8.142.10.182:8091';
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config?.data?.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.authorization = "Bearer " + vm.$store.state.vuex_token
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data

		// 自定义参数
		const custom = response.config?.custom
		if (data.code == 401) {
			uni.$u.toast(data.message)
			// #ifdef MP-WEIXIN
			setTimeout(() => {
				uni.$u.route({
					type: 'reLaunch',
					url: 'pages/login/home',
				})
			},1200)
			// #endif

			// #ifndef MP-WEIXIN
			setTimeout(() => {
				uni.$u.route({
					type: 'reLaunch',
					url: 'pages/login/login',
				})
			},1200)
			// #endif
			return new Promise(() => {})
		}
		if (data.code !== 200) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.message)
			}

			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}
		return data.data === undefined ? {} : data.data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}
