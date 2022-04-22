module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-base',
		'plugin:prettier/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: '12',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier', 'import'],
	rules: {
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-inferrable-types': 0,
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-use-before-define': 'error',
		'@typescript-eslint/typedef': [
			'error',
			{
				arrayDestructuring: true,
				arrowCallSignature: true,
				arrowParameter: true,
				callSignature: true,
				memberVariableDeclaration: true,
				objectDestructuring: true,
				parameter: true,
				propertyDeclaration: true,
			},
		],
		'import/extensions': 'off',
		'import/no-unresolved': 'error',
		'no-console': 'warn',
		'no-use-before-define': 'off',
		'prettier/prettier': 'error',
		'sort-imports': [
			'error',
			{
				allowSeparatedGroups: false,
				ignoreCase: false,
				ignoreDeclarationSort: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			},
		],
		'sort-keys': [
			'error',
			'asc',
			{
				caseSensitive: true,
				minKeys: 2,
				natural: false,
			},
		],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json',
			},
		},
	},
};
