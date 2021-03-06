export const statusTextMap = new Map([
	[200, '成功'],
	[400, '请求不正确'],
	[401, '没有登录'],
	[403, '没有权限'],
	[404, '请求地址不存在'],
	[408, '请求超时'],
	[413, '发送内容过大'],
	[500, '服务器内部错误'],
	[502, '网关错误'],
	[503, '服务暂时不可用'],
	[504, '网关超时'],
]);
