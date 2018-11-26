module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'hapi';
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试hello-hapi',
      auth: false,
    },
  },
];
