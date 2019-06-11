const http = require('http');
const app = require('./backend/app');
const debug = require('debug')('node-angular');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
      // named pipe
      return val;
  }

  if (port >= 0) {
      // port number
      return port;
  }

  return false;
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);
const server = http.createServer(app);
server.on('listening', onListening);
server.listen(port);
