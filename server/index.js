/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const ngrok = require('ngrok');
const fs = require('fs');
const path = require('path');
const https = require('https');

const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// Initialize frontend middleware that will serve your JS app
const webpackConfig = isDev
  ? require('../internals/webpack/webpack.dev.babel')
  : require('../internals/webpack/webpack.prod.babel');


console.log('isDev:', isDev);
// console.log('webpackConfig\n', webpackConfig);

app.use(frontend(webpackConfig));

const port = process.env.PORT || 3333;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err);
  }

  // Connect to ngrok in dev mode
  if (isDev) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
})

// https
var privateKey  = fs.readFileSync(path.join(process.cwd(), 'server/sslcert/server.key'), 'utf8');
var certificate = fs.readFileSync(path.join(process.cwd(), 'server/sslcert/server.crt'), 'utf8');

var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443);





