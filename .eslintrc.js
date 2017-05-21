module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": "true"
  },
  "rules": {
    "quotes": [2, "single"],
    "semi": [1, "always"],
    "max-len": [2, 80],
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
