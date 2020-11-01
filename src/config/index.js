import pkg from '../../package.json';

export default {
	appName: pkg.name,
	localStorageTabsKey: `${pkg.name}-tabs`,
	keyMap: {
		w: 87,
	},
};
