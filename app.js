require('env2')('./.env');

const Hapi = require('hapi');
const hapiAuthJWT2 = require('hapi-auth-jwt2');

const config = require('./config');

const routesHelloHapi = require('./routes/hello-world');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routesUsers = require('./routes/users');

const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginPagination = require('./plugins/hapi-pagination');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');
const pluginHapiPino = require('./plugins/hapi-pino');

const server = Hapi.server({ port: config.PORT, host: config.HOST });
const init = async () => {
  server.realm.modifiers.route.prefix = config.API_PREFIX;
  await server.register(
    [
      ...pluginHapiSwagger,
      hapiAuthJWT2,
      pluginPagination,
      // pluginHapiPino,
    ],
  );

  pluginHapiAuthJWT2(server);

  server.route([
    ...routesHelloHapi,
    ...routesShops,
    ...routesOrders,
    ...routesUsers,
  ]);

  await server.start();
  console.log(`server running at: ${server.info.uri}`);
};

init();
