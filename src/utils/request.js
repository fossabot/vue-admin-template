import axios from 'axios';
import cfg from '@/config';
import { isObject, objToStr, filterUndefinedNull } from './functions';
import { statusTextMap } from './status-code';
import { ApiResponseException } from './errors';

const { environment, baseUrls } = cfg;

class Request {
	constructor(env = 'production', extraConfig) {
		this.env = env;
		this.isProd = env === 'production';
		const headers = { ...extraConfig?.headers };
		this.customConfig = { background: !!extraConfig?.background };

		delete extraConfig?.headers;
		delete extraConfig?.background;

		if (!headers.authorization) delete headers.authorization;

		this.client = axios.create({
			timeout: Number.MAX_SAFE_INTEGER, // 暂时永不超时
			paramsSerializer: (params) => objToStr(params),
			...extraConfig,
			headers,
		});

		this._configRequestInterceptors();
		this._configResponseInterceptors();
	}

	_errorHandler(error) {
		const config = error.config;
		const response = error.response;
		const message = error.message || statusTextMap.get(status) || '未知错误';

		if (!config.background) {
			// @todo 菊花图
		}

		if (response && response.status) {
			const { status } = response;

			if (status === 401) {
				// @todo 登陆
				return Promise.reject(new ApiResponseException(status, message));
			}

			if (status === 403) {
				// @todo 权限不足
				return Promise.reject(new ApiResponseException(status, message));
			}

			// @todo message
			return Promise.reject(new ApiResponseException(status, message));
		}

		if (error.message.startsWith('timeout of ')) {
			// @todo message
			return Promise.reject(new ApiResponseException(408, message));
		}

		// @todo message
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

				console.log(data);

				if (isObject(data)) {
					const { code, IsSuccess, Message = '', value } = data;
					const customErrorCode = isNaN(Number(code)) ? -1 : Number(code);
					if (IsSuccess === false) {
						return Promise.reject(new ApiResponseException(customErrorCode, Message, value));
					}
				}

				return response;
			},
			(error) => {
				return this._errorHandler(error);
			},
		);
	}

	request(config) {
		const url = config.url?.replace(/^\//, '') || '';
		const apiHead = url.split('/')[0] || 'api';
		let baseUrlConfig = baseUrls[apiHead];

		if (!isObject(baseUrlConfig)) {
			baseUrlConfig = baseUrls.api;
		}

		const baseUrl = baseUrlConfig[this.env].replace(/\/$/, '');
		config.url = `${baseUrl}/${url}`;

		const { method, headers = {}, params, data } = config;

		delete config.headers;

		const relConfig = {
			withCredentials: true,
			headers: { ...headers },
			...this.customConfig,
			...config,
			params: {
				...filterUndefinedNull({
					...(isObject(params) ? params : {}),
					_t: !method || method.toLowerCase() === 'get' ? Date.now() : undefined,
				}),
			},
			data: filterUndefinedNull(data),
		};

		return this.client
			.request(relConfig)
			.then((response) => {
				// console.log(`%c${JSON.stringify(config, null, 2)}`, 'color:#0085fa', '--->>>', response);
				return response.data;
			})
			.catch((error) => {
				// console.log(`%c${JSON.stringify(config, null, 2)}`, 'color:#0085fa', '--->>>', error);
				return Promise.reject(error);
			});
	}
}

const client = new Request(environment);

export { axios, Request };
export default client;
