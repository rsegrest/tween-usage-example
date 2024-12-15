export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.js?$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/src/__tests__/"],
  fakeTimers: { enableGlobally: true },
};
