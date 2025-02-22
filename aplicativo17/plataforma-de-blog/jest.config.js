/** @type {import('jest').Config} */ // JSDoc para ajudar o VS Code
module.exports = {
  testMatch: [
    "**/test/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
};