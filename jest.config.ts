export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@application/(.*)': '<rootDir>/src/application/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@helpers/(.*)': '<rootDir>/src/helpers/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};
