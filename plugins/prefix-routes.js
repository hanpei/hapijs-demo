const vision = require('vision');
const package = require('package')(module);

const routesHelloHapi = require('../routes/hello-world');
const routesShops = require('../routes/shops');
const routesOrders = require('../routes/orders');
const routesUsers = require('../routes/users');

module.exports = (server) => ({
  plugin: {
    name: 'api',
    register(server) {
      server.route([
        ...routesHelloHapi,
        ...routesShops,
        ...routesOrders,
        ...routesUsers,
      ]);
    },
  },
});
