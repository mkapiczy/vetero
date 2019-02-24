module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? ["error", { "allow": ["warn", "error"] }] : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: [0, 'always'],
    'max-len': ["warn", { "code": 100, "ignoreComments": true }]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
