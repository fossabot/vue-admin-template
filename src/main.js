import Vue from 'vue';
import ElementUI from 'element-ui';
import getAppInfo from '@/utils/app-info';
import App from './App.vue';
import store from './store';
import router from './router';
import './assets/icons';
import './permission';
import './registerServiceWorker';
import './styles/global.less';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';

getAppInfo(true);

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
