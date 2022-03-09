import request from '@/common/request.js'

export function login(data) {
	return request.request({
		url: '/api/user/UserIndex/login?client=app',
		method: 'POST',
    data:data,
		authType: 'None'
	})
}






