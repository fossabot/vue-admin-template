import pkg from '../../package.json';

export default {
	environment: process.env.NODE_ENV,
	appName: pkg.name,
	localStorageTabsKey: `${pkg.name}-tabs`,
	keyMap: {
		w: 87,
	},
};
