const JWT = require('jsonwebtoken');
const axios = require('axios');
const Joi = require('joi');

const config = require('../config');
const models = require('../models');
const decryptData = require('../utils/decrypt-data');

const GROUP_NAME = 'users';

module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (request, h) => {
      const generateJWT = jwtInfo => {
        const payload = {
          userId: jwtInfo.userId,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
        };
        return JWT.sign(payload, process.env.JWT_SECRET);
      };

      return generateJWT({ userId: 1 });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '用于测试的用户 JWT 签发',
      auth: false,
    },
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    handler: async (request, h) => {
      const appid = config.wxAppid;
      const secret = config.wxSecret;
      const { code, encryptedData, iv } = request.payload;

      const response = await axios({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        method: 'GET',
        params: {
          appid,
          secret,
          js_code: code,
          grant_type: 'authorization_code',
        },
      });

      const { openid, session_key: sessionKey } = response.data;

      const user = await models.users.findOrCreate({
        where: { open_id: openid },
      });

      let userInfo;
      try {
        userInfo = decryptData(encryptedData, iv, sessionKey, appid);
      } catch (error) {
        throw new Error('decryptData error', error);
      }

      console.log('userInfo', userInfo);
      await models.users.update(
        {
          nick_name: userInfo.nickName,
          gender: userInfo.gender,
          avatar_url: userInfo.avatarUrl,
          open_id: openid,
          session_key: userInfo.sessionKey,
          phone: userInfo.phoneNumber,
        },
        {
          where: { open_id: openid },
        }
      );

      const generateJWT = jwtInfo => {
        const payload = {
          userId: jwtInfo.userId,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
        };
        return JWT.sign(payload, config.jwtSecret);
      };

      return generateJWT({
        userId: user[0].id,
      });
    },
    config: {
      auth: false,
      tags: ['api', GROUP_NAME],
      description: '微信登陆',
      validate: {
        payload: {
          code: Joi.string()
            .required()
            .description('微信用户登陆的临时code'),
          encryptedData: Joi.string()
            .required()
            .description('微信用户信息encryptedData'),
          iv: Joi.string()
            .required()
            .description('微信用户信息iv'),
        },
      },
    },
  },
];
