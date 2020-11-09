const extraApiPrefix = '/k20/vas-web-api';
const { origin } = window.location;

// 为方便日后改造或变更，即便origin一样，api开头不一样的也请务必在此区分开。
const baseUrls = {
	api: {
		development: `${origin}${extraApiPrefix}`,
		test: `${origin}${extraApiPrefix}`,
		production: `${origin}${extraApiPrefix}`,
	},
	otherApi: {}, // 其他开头api
};

export default baseUrls;
