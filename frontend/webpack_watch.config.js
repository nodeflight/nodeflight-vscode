path = require('path');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    watch: true,
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
        ],
    },
};
