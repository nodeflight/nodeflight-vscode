const prod = require('./common.js');

module.exports = prod.map(config => ({
    ...config,
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    watch: true,
}));
