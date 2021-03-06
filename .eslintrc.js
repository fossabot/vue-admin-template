const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
	plugins: ['prettier'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'prettier/prettier': 'error',
		'no-console': process.env.NODE_ENV === 'production' ? WARN : OFF,
		'no-debugger': process.env.NODE_ENV === 'production' ? WARN : OFF,
		semi: ERROR,
		quotes: ERROR,
		indent: [ERROR, 'tab', { SwitchCase: 1 }],
		radix: [ERROR, 'as-needed'],
		'one-var': OFF,
		'func-names': OFF,
		'global-require': OFF,
		'arrow-body-style': OFF,
		'prefer-destructuring': OFF,
		'object-curly-spacing': [ERROR, 'always'],
		'key-spacing': [1, { "beforeColon": false, "afterColon": true }],

		'no-var': ERROR,
		'no-proto': ERROR,
		'no-alert': ERROR,
		'no-undef': ERROR,
		'no-empty': ERROR,
		'no-plusplus': OFF,
		'no-shadow': ERROR,
		'no-bitwise': ERROR,
		'no-script-url': OFF,
		'no-iterator': ERROR,
		'no-lonely-if': ERROR,
		'no-unused-vars': ERROR,
		'no-new-object': ERROR,
		'no-undef-init': ERROR,
		'no-multi-assign': OFF,
		'no-else-return': ERROR,
		'no-return-assign': OFF,
		'no-unreachable': ERROR,
		'no-return-await': ERROR,
		'no-self-compare': ERROR,
		'no-param-reassign': OFF,
		'no-mixed-operators': OFF,
		'no-useless-concat': ERROR,
		'no-nested-ternary': ERROR,
		'no-useless-return': ERROR,
		'no-use-before-define': OFF,
		'no-underscore-dangle': OFF,
		'no-restricted-globals': OFF,
		'no-unneeded-ternary': ERROR,
		'no-restricted-syntax': WARN,
		'no-unused-expressions': ERROR,
		'no-this-before-super': ERROR,
		'no-constant-condition': ERROR,
		'no-whitespace-before-property': ERROR,

		'max-depth': [ERROR, 2],
		'max-params': [ERROR, 4],
		'max-len': [ERROR, { code: 120 }],
		'max-lines-per-function': [ERROR, 200],
		'max-lines': [ERROR, { max: 800, skipBlankLines: true, skipComments: true }],

		'consistent-return': OFF,
		'class-methods-use-this': OFF,
		'comma-dangle': [ERROR, 'always-multiline'],

		'lines-between-class-members': OFF,
		'linebreak-style': [OFF, 'windows'],

		'import/no-unresolved': OFF,
		'import/no-dynamic-require': OFF,
		'import/prefer-default-export': OFF,
		'import/no-extraneous-dependencies': OFF,
		'import/extensions': [OFF, '.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				mocha: true,
			},
		},
	],
};
