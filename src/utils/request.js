import axios from 'axios';
import cfg from '@/config';
import { isObject, objToStr, filterUndefinedNull, getQueryString } from './functions';
import { statusTextMap } from './status-code';
import { ApiResponseException } from './errors';

const { environment, baseUrls } = cfg;

class Request {
	constructor(env = 'production', initConfig) {
		this.env = env;

		this.client = axios.create({
			timeout: 0, // 暂时永不超时
			withCredentials: true,
			paramsSerializer: (params) => objToStr(params),
			...initConfig,
			background: !!initConfig?.background,
		});

		this._configRequestInterceptors();
		this._configResponseInterceptors();
	}

	_errorHandler(error) {
		const config = error.config;
		const response = error.response;
		const resMsg = response?.data?.message;
		const customMsg = statusTextMap.get(response?.status);
		const message = resMsg || customMsg || error.message || '未知错误';

		if (!config.background) {
			// @todo 菊花图
		}

		// @todo message

		if (response?.status) {
			const { status } = response;

			if (status === 401) {
				// @todo 登陆
			}

			if (status === 403) {
				// @todo 权限不足
			}

			return Promise.reject(new ApiResponseException(status, message));
		}

		if (error.message.startsWith('timeout of ')) {
			return Promise.reject(new ApiResponseException(408, message));
		}

		return Promise.reject(new ApiResponseException(500, message));
	}

	_configRequestInterceptors() {
		this.client.interceptors.request.use((config) => {
			if (!config.background) {
				// @todo message
			}

			return config;
		});
	}

	_configResponseInterceptors() {
		this.client.interceptors.response.use(
			(response) => {
				const { config, data } = response;

				if (!config.background) {
					// @todo message
				}

				if (!isObject(data)) {
					return response;
				}

				const { code, success, message = '', value } = data;
				const customErrorCode = isNaN(Number(code)) ? -1 : Number(code);
				if (Number(code) === -1 || success === false) {
					return Promise.reject(new ApiResponseException(customErrorCode, message, value));
				}

				return response;
			},
			(error) => {
				return this._errorHandler(error);
			},
		);
	}

	request(config) {
		const url = config.url.replace(/^\//, '') || '';
		const apiHead = url.split('/')[0] || 'api';
		let baseUrlConfig = baseUrls[apiHead];

		if (!isObject(baseUrlConfig)) {
			baseUrlConfig = baseUrls.api;
		}

		const baseUrl = baseUrlConfig[this.env].replace(/\/$/, '');
		config.url = `${baseUrl}/${url}`;

		const { method, headers = {}, format = 'json', params, data } = config;

		delete config.headers;

		let body = filterUndefinedNull(data);
		// FormData在这儿处理
		if (format.toLocaleLowerCase() === 'formdata') {
			const fd = new FormData();
			Object.keys(body).forEach((key) => {
				fd.append(key, body[key]);
			});
			body = fd;
		}

		const relConfig = {
			withCredentials: true,
			...config,
			headers: { ...headers },
			params: {
				...filterUndefinedNull({
					...(isObject(params) ? params : {}),
					_t: !method || method.toLowerCase() === 'get' ? Date.now() : undefined,
				}),
			},
			data: { ...body },
		};

		return this.client
			.request(relConfig)
			.then((response) => {
				// console.log(`%c${JSON.stringify(config, null, 2)}`, 'color:#0085fa', '--->>>', response);
				if (config.fullResponse) return response;

				return response.data;
			})
			.catch((error) => {
				// console.log(`%c${JSON.stringify(config, null, 2)}`, 'color:#0085fa', '--->>>', error);
				return Promise.reject(error);
			});
	}

	/**
	 * 打开新链接下载文件
	 * @param {Object} config
	 * @param {String} config?.method
	 * @param {String} config.url 接口url路径
	 * @param {Object} config?.params 将会以字符串形式拼接至url
	 */
	downLoadByOpenNewTab(config = {}) {
		if (config.method && config.method.toLowerCase() !== 'get') {
			return;
		}

		const path = config.url.replace(/^\//, '') || '';
		const apiHead = path.split('/')[0] || 'api';
		let baseUrlConfig = baseUrls[apiHead];

		if (!isObject(baseUrlConfig)) {
			baseUrlConfig = baseUrls.api;
		}

		const baseUrl = baseUrlConfig[this.env].replace(/\/$/, '');
		const url = `${baseUrl}/${path}`;
		const params = filterUndefinedNull({ ...config.params, _t: Date.now() });

		window.open(`${url}?${objToStr(params)}`).opener = null;
	}

	/**
	 * 通过Blob下载文件
	 * 注意: 针对get请求，假如获取不到文件名，会使用链接下载，此时会请求两次
	 * @param {Object} config 参数同request
	 */
	downLoadByBlob(config) {
		this.request({
			...config,
			responseType: 'blob',
			fullResponse: true,
		}).then((res) => {
			const name = getQueryString('filename', res.headers['content-disposition'], ';');
			if (!name) {
				this.downLoadByOpenNewTab({
					method: config.method,
					url: config.url,
					params: config.params || {},
				});
			} else {
				const url = URL.createObjectURL(res.data);
				const el = document.createElement('a');
				el.target = '_blank';
				el.download = name;
				el.href = url;
				el.click();
				URL.revokeObjectURL(url);
			}
		});
	}
}

const client = new Request(environment);

export { axios, Request };
export default client;
