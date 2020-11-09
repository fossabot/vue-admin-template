import client from '@/utils/request';
/**
 * 登录
 */
export function onLogin(data) {
	return client.request({
		method: 'post',
		url: '/api/Auth/Login',
		background: true,
		data,
	});
}

/**
 * 退出
 */
export function onLogout() {
	return client.request({
		method: 'post',
		url: '/api/Auth/Logout',
	});
}
