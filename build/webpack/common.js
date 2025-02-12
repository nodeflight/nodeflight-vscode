const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
    {
        target: 'node',
        entry: './src/extension/extension.ts',
        resolve: {
            extensions: ['.js', '.jsx', '.tsx', '.ts'],
        },
        output: {
            filename: 'extension.js',
            path: path.resolve('out'),
            libraryTarget: "commonjs2",
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        configFile: 'build/tsconfig/extension.json',
                    },
                },
            ],
        },
        externals: {
            vscode: "commonjs vscode",
        },
    },
    {
        entry: './src/frontend/index.tsx',
        resolve: {
            extensions: ['.js', '.jsx', '.tsx', '.ts', '.tsx', '.html', '.scss'],
        },
        output: {
            filename: 'frontend.js',
            path: path.resolve('out'),
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'frontend.css',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        configFile: 'build/tsconfig/frontend.json',
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
            ],
        },
    },
];
