module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"settings": {
		"react": { "version": "detect" }
	},
	"extends": [
		"standard-with-typescript",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"eslint-config-prettier",
		"plugin:@next/next/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"@typescript-eslint/no-non-null-assertion": "off",
		"@next/next/no-img-element": "off"
	}
}
