import Vuex from 'vuex'
import Vue from 'vue'

import getters from './getters.js'

// modules
import user from './user/index.js'
import theme from './theme/index.js'
import i18n from './i18n/index.js'
import common from './common/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		common,
		theme,
		i18n,
		user
	},
	getters
})

export default store
