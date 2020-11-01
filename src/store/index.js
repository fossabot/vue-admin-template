import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const webpackContext = require.context('./modules', true, /\.js$/);

const modules = webpackContext.keys().reduce((res, path) => {
	// eg: './global.js' => 'global'
	const moduleName = path.replace(/^\.\/(.*)\.js$/, '$1');
	res[moduleName] = webpackContext(path).default;
	return res;
}, {});

export default new Vuex.Store({
	modules,
});
