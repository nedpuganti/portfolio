/* eslint-disable */
export default {
  displayName: 'myportfolio-ui',
  // preset: './jest.preset.js',
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@environments/(.*)': ['<rootDir>/src/environments/$1'],
    '@services/(.*)': ['<rootDir>/src/app/services/$1'],
    '@shared/(.*)': ['<rootDir>/src/app/shared/$1'],
    '@utils/(.*)': ['<rootDir>/src/app/shared/utils/$1']
  },
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  // coverageDirectory: './coverage/provider-ui',
  collectCoverage: true,
  // coverageReporters: ['ts', 'js', 'html', 'json', 'mjs'],
  // collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  passWithNoTests: true,
  testTimeout: 15000,
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ],
  testEnvironment: 'jsdom'
};
