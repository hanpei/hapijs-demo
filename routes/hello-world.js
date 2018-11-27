module.exports = [
  {
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
      return 'hello hapi';
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试hello-hapi',
      auth: false,
    },
  },
];
