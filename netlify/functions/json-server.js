const { createServer } = require('http');
const { parse } = require('url');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const app = createServer((req, res) => {
  const url = parse(req.url, true);
  if (url.pathname.startsWith('/.netlify/functions/json-server')) {
    req.url = req.url.replace('/.netlify/functions/json-server', '');
    server(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(9000, () => {
  console.log('JSON Server is running on port 9000');
});

exports.handler = (event, context) => {
  return new Promise((resolve, reject) => {
    app.emit('request', event, {
      end: resolve,
      setHeader: (name, value) => {
        if (name === 'content-type') {
          context.headers[name.toLowerCase()] = value;
        }
      }
    });
  });
};