module.exports = {
	"transform": {
		"^.+\\.js$": "babel-jest",
		"^.+\\.svelte$": "svelte-jester"
	},
	moduleFileExtensions: ['js', 'svelte'],
	moduleNameMapper: {
		'^\\$lib(.*)$': '<rootDir>/src/lib$1',
		'^\\$app(.*)$': [
			'<rootDir>/.svelte-kit/dev/runtime/app$1',
			'<rootDir>/.svelte-kit/build/runtime/app$1'
		]
	},
	testPathIgnorePatterns: ["node_modules"],
	bail: false,
	verbose: true,
	transformIgnorePatterns: ["node_modules"],
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};