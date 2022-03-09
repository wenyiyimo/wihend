import { login } from '@/api/user.js'
import { updateAccess } from '@/common/token.js'

const actions = {
	userLogin({commit},info) {
		return new Promise((resolve, reject) => {
			login(info).then(response => {
        commit('set_has_loged_in', true)
        commit('set_user_info', response.data)
        updateAccess(response.data?.token)
				resolve(response)
			}).catch(err => {
				reject(err)
			})
		})
	},
}

export default actions
