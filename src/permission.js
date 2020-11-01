import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import router from './router';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach(() => {
	NProgress.done();
});
