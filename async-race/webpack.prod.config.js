const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
    mode: 'production',
   plugins: [
        new ESLintPlugin({extensions: ['ts', 'js']})
    ]
};
