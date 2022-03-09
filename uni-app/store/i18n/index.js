const state = {
	// 当前语言
	language: ''
}

const mutations = {
	setLanguage: (state, val) => {
		state.language = val
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
