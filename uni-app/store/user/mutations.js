const mutations = {
	set_has_loged_in: (state, logedIn) => {
		state.hasLogedIn = logedIn
	},
  set_user_info: (state, info) => {
		state.userInfo = info
	},
	clear: (state) => {
		state.hasLogedIn = false
	}
}

export default mutations
