module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "node": true,
    "browser": true
  },
  "rules": {
    "quotes": [2, "single"],
    "semi": [1, "always"],
    "max-len": [2, 80],
    "no-console": 0,
    "react/prop-types": 1,
    "react/prefer-stateless-function": 1,
    "react/require-default-props": 1,
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  }
}
