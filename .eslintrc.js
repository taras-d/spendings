module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    // Use babel parser to avoid "Parsing error: Unexpected token =" error
    // caused by class properties
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "single",
            { allowTemplateLiterals: true }
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "off"
        ]
    }
};