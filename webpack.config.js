const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports =
{
    entry: {
        app: './src/index.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './static'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            hash: true,
            filename: 'index.html',
            template: __dirname + '/index.html',
        }),
        new MiniCssExtractPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                {
                loader: 'html-loader',
                options: {
                minimize: true,
                // interpolation: false
                }
                }
                ]
            },

            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]


    },
    resolve: {
        extensions: ['*', '.js', '.es6', '.ts']
    },
}