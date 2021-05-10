const Hapi = require('@hapi/hapi');
const routes = require('./routes'); //import route
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: {
          origin: ['*'],
        },
      },
  });
 
  server.route(routes); //route configuration pada server

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();