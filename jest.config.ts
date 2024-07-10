module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    testRegex: '/src/(services|.*\\.test)\\.ts$', 
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };