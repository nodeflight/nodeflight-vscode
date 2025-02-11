const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.tsx',
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.html', '.scss'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '..', 'out', 'frontend'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
};
