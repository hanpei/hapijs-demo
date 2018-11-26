const inert = require('inert');
const vision = require('vision');
const package = require('package')(module);
const hapiSwagger = require('hapi-swagger');
const config = require('../config');


const swaggerOptions = {
  info: {
    title: '接口文档',
    version: package.version,
  },
  basePath: config.API_PREFIX,
  grouping: 'tags',
  tags: [
    {
      name: 'tests',
      description: '测试相关',
    },
  ],
};

module.exports = [
  inert,
  vision,
  {
    plugin: hapiSwagger,
    options: swaggerOptions,
  },
];
