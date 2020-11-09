module.exports = {
	'/k20/vas-web-api/api/Auth': {
		target: 'http://192.168.7.8:8081',
		changeOrigin: true,
		pathRewrite: {
			'^/k20/vas-web-api/api/Auth': '/api/Auth',
		},
	},
	'/k20/vas-web-api/api': {
		target: 'http://192.168.8.40:8099',
		changeOrigin: true,
		pathRewrite: {
			'^/k20/vas-web-api/api': '/api',
		},
	},
};
