const prod = require('./common.js');

module.exports = prod.map(config => ({
    ...config,
    mode: 'production',
}));
