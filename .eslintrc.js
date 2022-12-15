/*
| Developed by Starton
| Filename : index.js
*/

// eslint-disable-next-line no-undef
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:prettier/recommended',
		'prettier',
	],
	plugins: ['prettier', 'import'],
	overrides: [
		{
			parser: '@typescript-eslint/parser',
			files: ['*.ts', '*.tsx'], // Your TypeScript files extension
			// As mentioned in the comments, you should extend TypeScript plugins here,
			// instead of extending them outside the `overrides`.
			// If you don't want to extend any rules, you don't need an `extends` attribute.
			extends: [
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			plugins: ['@typescript-eslint'],
			parserOptions: {
				project: ['./tsconfig.json'], // Specify it only for TypeScript files
			},
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/no-empty-interface': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-misused-promises': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/unbound-method': 'off',
				'@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
				'@typescript-eslint/no-unsafe-call': 'off',
			},
		},
	],
	rules: {
		semi: ['error', 'never'],
		'comma-dangle': ['error', 'always-multiline'],
		'quote-props': ['error', 'as-needed'],
		'no-unused-vars': 'off',
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'internal', 'object'],
			},
		],
		'import/extensions': [
			'error',
			{
				js: 'never',
				svg: 'always',
				ts: 'never',
			},
		],
		'import/prefer-default-export': 'off',
		'prettier/prettier': [
			'error',
			{
				printWidth: 120,
				tabWidth: 4,
				useTabs: true,
				semi: false,
				singleQuote: true,
				quoteProps: 'as-needed',
				jsxSingleQuote: false,
				trailingComma: 'all',
				bracketSpacing: true,
				jsxBracketSameLine: false,
				arrowParens: 'always',
				proseWrap: 'preserve',
				htmlWhitespaceSensitivity: 'css',
				endOfLine: 'lf',
			},
		],
	},
}
