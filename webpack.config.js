const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        customapp: './src/customapp.jsx'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: ['babel-loader']},
            {test: /\.(css)$/, use: ['style-loader','css-loader']}
        ]

    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: 'Invoice Generator',
            template: './src/template.ejs',
            filename: 'invoiceGenerator.html',
            chunks: ['customapp']
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath: '/'
    },
    devtool: 'inline-source-map'
}