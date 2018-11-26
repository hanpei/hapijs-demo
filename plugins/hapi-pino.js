const hapiPino = require('hapi-pino');

module.exports = {
  plugin: hapiPino,
  options: {
    prettyPrint: process.env.NODE_ENV !== 'production',
  },
};
