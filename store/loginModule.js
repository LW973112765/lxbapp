export default {
    namespaced: true,
    mutations: {
        //设置用户信息
        setUser(state, zxl) {
            state.userinfo = zxl
        },
        //清空用户信息
        clearUser(state) {
            state.userinfo = {
                username: '',
                token: '',
                avatar: '',
                email: '',
                age: '',
                sex: '',
                id: '',
				password:'',
				type:''
            }
        },

    },
    state: {
        userinfo: {
            username: '',
            token: '',
            avatar: '',
            email: '',
            age: '',
            sex: '',
            id: '',
			password:'',
			type:''
        },

    },
}