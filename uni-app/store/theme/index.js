const state = {
	// 当前主题
	theme: ''
}

const mutations = {
	setTheme: (state, val) => {
		state.theme = val
	}
}

const actions = {
	
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}

