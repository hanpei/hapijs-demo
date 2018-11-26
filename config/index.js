const { env } = process;

module.exports = {
  HOST: env.HOST,
  PORT: env.PORT,
  jwtSecret: env.JWT_SECRET,
  wxAppid: env.WX_APPID,
  wxSecret: env.WX_SECRET,
  API_PREFIX: env.API_PREFIX,
};
