module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": "true"
  },
  "rules": {
    "quotes": [2, "double"],
    "semi": [1, "always"],
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
