import type { Config } from '@jest/types';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config.InitialOptions = {
	rootDir: './',
	moduleFileExtensions: ['js', 'ts'],
	testPathIgnorePatterns: ['/node_modules/', '/build/'],
	testEnvironment: 'node',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	roots: ['<rootDir>/src/', '<rootDir>/test/'],
	coverageDirectory: './coverage',
	collectCoverageFrom: [
		'src/**/*.{js,ts}',
		'!src/main.ts',
		'!src/app.module.ts',
		'!src/**/*.module.ts',
	],
	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
		prefix: '<rootDir>/',
	}),
};

export default config;