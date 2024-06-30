const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./netlify/functions/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const handler = async (event, context) => {
  const { path } = event;
  const response = await new Promise((resolve) => {
    server.handle({ url: path, method: event.httpMethod }, {
      setHeader: (key, value) => {
        if (!response.headers) {
          response.headers = {};
        }
        response.headers[key] = value;
      },
      end: (body) => {
        response.body = body;
        resolve(response);
      }
    });
  });
  return {
    statusCode: response.statusCode || 200,
    body: response.body,
    headers: response.headers,
  };
};

module.exports = { handler };
