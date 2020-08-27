module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: '__tests__/coverage',
  testMatch: ['**/__tests__/**/*.+(spec|test).js?(x)'],
};
