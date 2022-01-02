//请求地址
let baseUrl = ''
let imgUrl = ''
let QRurl = ''
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	baseUrl = 'http://192.168.50.198:9000/shangchain/bsnApi' //福州本地测试
	// baseUrl = 'http://192.168.20.66:9093/webclient' //福州本地测试
	// baseUrl = 'http://47.106.223.235/webclient-green' //测试
	imgUrl = "http://47.106.223.235/" //测试
	// QRurl = window.location.protocol + '//' + window.location.host
} else {
	// 生产环境
	// baseUrl = 'https://www.fjbsn.com/shangchain/bsnApi' //测试
	baseUrl = '/shangchain/bsnApi' //测试
	imgUrl = "http://47.106.223.235/" //测试
	// QRurl = window.location.protocol + '//' + window.location.host + '/clientWeb' //测试
	// baseUrl = 'http://47.119.147.247/webclient-green' //正式
	// imgUrl = "http://47.119.147.247/"//正式
	// QRurl = window.location.protocol + '//' + window.location.host + '/clientWebG'//正式
}

let ixmoauthUrl = `${baseUrl}/api/ixmOauth/app/login`

//公用文件提交地址
let uploadUrl = `${baseUrl}/common/upload`

const SECRET_STR = 'jE!%88K6'

export default {
	baseUrl,
	imgUrl,
	uploadUrl,
	ixmoauthUrl,
	QRurl,
	/**
	 * 获取通用请求头
	 * 包含用户登录权限 && 签名
	 */
	getComHeader(param = {}) {
		let comHeader = {}
		if (uni.getStorageSync('token')) {
			comHeader['Authorization'] = uni.getStorageSync('token') || ''
		}
		// comHeader = setSignHeaders(comHeader, param, SECRET_STR)
		return comHeader
	},
	/**
	 *
	 * @param {*} url 请求地址
	 * @param {*} data 请求参数
	 * @param {*} header 请求头
	 * @param {*} method 请求非法
	 * @param {*} isLoading 是否显示加载状态
	 */
	request(url = '', data = {}, header = {}, method = '', isLoading = false) {
		if (header == true) {
			header = {}
		}
		// if (uni.getStorageSync('token')) {
		header['Authorization'] = uni.getStorageSync('token') || ''
		// }
		// header = setSignHeaders(header, data, SECRET_STR)

		return new Promise((resolve, reject) => {
			if (isLoading) {
				uni.showLoading({
					title: '加载中',
				})
			}
			uni.request({
				url: `${baseUrl}${url}`,
				data: data,
				method: method,
				header: header,
				success: res => {
					// console.log(res);
					if (isLoading) {
						uni.hideLoading()
					}
					if (res.statusCode == 200) {
						if (res.data.code != 0) {
							if (res.data.code == 10004) {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: res.data.message,
									success: function (res) {
										if (res.confirm) {
											ixmsdk.close()
										}
									}
								});
							} else {
								// console.log(res.data)
								uni.showToast({
									title: res.data.message,
									icon: 'none',
									duration: 2000,
								})
							}
						}
						resolve(res)
					} else if (res.statusCode == 500) {
						// console.log(`服务器状态：400，${JSON.stringify(res)}`)
						uni.showToast({
							title: `服务端异常：${res.data.message}`,
							icon: 'none',
							duration: 2000,
						})
						reject(res)
					} else {
						// console.log(`服务器状态：服务器异常${JSON.stringify(res)}`)
						uni.showToast({
							title: `服务端异常：${res.data.message}`,
							icon: 'none',
							duration: 2000,
						})
						reject(res)
					}
				},
				fail: res => {
					reject(res)
				},
			})
		})
	},
	post(url = '', data = {}, isLoading = false, header = {}) {
		if (header == true) {
			header = {}
		}
		//post默认请求头 和 接口保持一致
		header['content-type'] = 'application/json'
		return this.request(url, data, header, 'POST', isLoading)
	},
	postupload(url = '', data = {}, isLoading = false, header = {}) {
		if (header == true) {
			header = {}
		}
		//post默认请求头 和 接口保持一致
		header['content-type'] = 'multipart/form-data'
		return this.request(url, data, header, 'POST', isLoading)
	},
	get(url = '', data = {}, isLoading = false, header = {}) {
		return this.request(url, data, header, 'GET', isLoading)
	},
	put(url = '', data = {}, header = {}, isToken = false, isLoading = false) {
		//默认请求头
		header['Content-Type'] = 'application/json'
		return this.request(url, data, header, 'PUT', isLoading)
	},
	delete(url = '', data = {}, header = {}, isToken = false, isLoading = false) {
		//默认请求头
		header['content-type'] = 'application/json'
		return this.request(url, data, header, 'DELETE', isLoading)
	},
}
