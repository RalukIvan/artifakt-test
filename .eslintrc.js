const path = require("path")

module.exports = {
    extends: [ "plugin:vue/recommended" ],
    settings: {
      "import/resolver": "webpack"
    },
    rules: {
      "comma-dangle": [
          "error",
          "always-multiline"
      ],
      "semi": [
        "error",
        "never",
      ],
      "indent": [
        "warn",
        4,
        {
          MemberExpression: 0,
          SwitchCase: 1,
        },
      ],
    },
  }