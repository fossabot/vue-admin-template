module.exports = {
	'/api': {
		target: 'http://192.168.7.8:8081',
		changeOrigin: true,
		pathRewrite: {
			'^/api': '/api',
		},
	},
	'/pms/ws': {
		target: 'http://192.168.7.8:8081',
		changeOrigin: true,
		ws: true,
		pathRewrite: {
			'^/pms/ws': '/pms/ws',
		},
	},
};
