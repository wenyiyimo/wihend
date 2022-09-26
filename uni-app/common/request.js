import Request from '@/nPro/request/index.js'
import {isAccessExpired, isRefreshExpired, updateAccess, updateAccessRefresh} from '@/common/token.js'


import {
	baseUrl, isMockServer
} from './env.js'

const config = {
	baseUrl: baseUrl,
	header: {
    "content-type": "application/x-www-form-urlencoded",
    // "qx-ua": md5(store.state.clientIdent).toString().toLowerCase(),
    // "qx-pk": store.state.privateKey,
    // "qx-client": store.state.clientIdent,
    // "qx-tk": store.getters.token
    // "qx-v" : store.state.appVersionCode
  }
}

// 设置自己的请求拦截器，必须加上 `async`
// 请求前的拦截，比如是否登录/过期/刷新token/...
const reqInterceptor = async (options) => {
	
	_requestLog(options, "成功通过")
	return options
}

// 设置自己的响应拦截器
// 统一对返回的数据进行整理，方便接口统一使用
// conf是您api的options信息，一般情况下您只需要用到您自定义的标记字段
const resInterceptor = (response, conf={}) => {
	if (response.nError) {
		return response.response
	}
	if (response.nFail) {
		return response.response
	}
	if (response.nCancel) {
		return response.response
	}
	const statusCode = response.statusCode
	
	// response interceptor
	if (statusCode >= 200 && statusCode < 300) { //成功
		_responseLog(response, conf, "response 200-299")
		// if the returned data is string type, we need to parse it into Object
		if (typeof response.data === 'string') {
			const parsed = JSON.parse(response.data)
			response.data = parsed
		}
		// for mock data, we do not have {code: 200, msg: "xxx", data: {}} style, just {}
		if (process.env.NODE_ENV === 'development') {
			if (response.data.errMsg) {
				return {
					nReqToReject: true,
					text: response.data.errMsg,
					// we could change type according to code
					type: 'error',
					mode: 'big'
				}
			}
			return response.data
		} else {
			if (response.data.errMsg) {
				return {
					nReqToReject: true,
					text: response.data.errMsg,
					// we could change type according to code
					type: 'error',
					node: 'big'
				}
			}
			return response.data
		}
	} else if (statusCode === 500) {
		_responseLog(response, conf, "response 500")
		return {
			nReqToReject: true,
			text: "服务异常，请稍后再试或反馈问题",
			// we could change type according to code
			type: 'error'
		}
	} else {
		_responseLog(response, conf, "response 300-499")
		// we do not do any hint to user with server errors
		return {
			nReqToReject: true,
			text: "请求失败，请稍后再试或反馈问题",
			// we could change type according to code
			type: 'error'
		}
	}
}

// 一个实例请求器在很多请求中是通用的,它只会被初始化一次,每一次请求的时候,用的是同一个请求器,并不是每次都初始化
// 如果请求的类型不一致,处理方式不一样,建议您实例化多个请求器
// 或者我们可以再具体的请求里面对option进行配置,覆盖掉请求器的配置,覆盖只在当前请求有效
const req = new Request(config, reqInterceptor, resInterceptor)

// request log
function _requestLog(req, describe=null) {
	if (process.env.NODE_ENV === 'development') {
		console.log("地址：" + req.url)
		if (describe) {
			console.log("描述：" + describe)
		}
		console.log("详细：" + JSON.stringify(req))
	}
	//TODO into log server
}

// response log
function _responseLog(res, conf={}, describe=null) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		console.log("地址: " + conf.url)
		if (describe) {
			console.log("描述：" + describe)
		}
		console.log("结果: " + JSON.stringify(res))
	}
}

function _toRefreshAccess() {
	const app = getApp({allowDefault: true})
	const refresh = app.globalData.refresh
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl + '/token/refresh/',
			method: 'POST',
			data: {
				refresh: refresh
			},
			success: res => {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					if (process.env.NODE_ENV === 'development' && isMockServer) {
						updateAccess(res.data.access)
						resolve(res.data.access)
					} else {
						if (res.data.code === 200) {
							updateAccess(res.data.data.access)
							resolve(res.data.data.access)
						} else {
							updateAccessRefresh(null, null)
							reject("get error")
						}
					}
				} else {
					// TODO: handle error info
					// here we clear all token info, we need to login again
					updateAccessRefresh(null, null)
					reject("get error")
				}
			},
			fail: (e) => {
				reject('no_network')
			}
		})
	})
}

export default req
