const config = require('../config');

const validate = async (decoded, request) => {
  console.log(' - - - - - - - decoded token:');
  console.log(decoded);
  console.log(' - - - - - - - request info:');
  console.log(request.info);
  console.log(' - - - - - - - user agent:');
  console.log(request.headers['user-agent']);

  let error;

  const { userId } = decoded;

  console.log('decoded', decoded);

  if (!userId) {
    return { isValid: false, credentials: null };
  }

  const credentials = { userId };

  return { isValid: true, credentials };
};

module.exports = server => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate: validate,
  });
  server.auth.default('jwt');
};
