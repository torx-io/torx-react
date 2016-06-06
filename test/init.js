/* eslint-disable no-console */
var assert = require('assert');
require('isomorphic-fetch');
'use strict';
var app               = require('../server/app');
var http              = require('http');
var https             = require('https');
var config            = require('../config');
var fs                = require('fs');
var path              = require('path');

// SSL configuration
var options = {
  key: fs.readFileSync(path.join(__dirname, '../server/', config.ssl.key)),
  //ca: [ fs.readFileSync(config.ssl.ca) ],
  cert: fs.readFileSync(path.join(__dirname, '../server/', config.ssl.cert))
};

app.set('port', process.env.PORT || 3000);
app.set('port_ssl', process.env.PORT_SSL || 3443);

// Create http server
var httpServer = http.createServer(app);
var serverInsecure = httpServer.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + serverInsecure.address().port);
});

// Create https server
var httpsServer = https.createServer(options, app);
var serverSecure = httpsServer.listen(app.get('port_ssl'), function() {
  console.log('Express secure server listening on port ' + serverSecure.address().port);
});

// Prevents invalid self-signed certificate on fetcher.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var url = 'https://app.torx.dev:3443';

describe('Smoke Test', function() {
  it('should respond to GET', function (done) {
    fetch(url)
    .then(response => {
      assert.equal(response.status, 200);
      done();
    })
    .catch(function(err) {
      return done(err);
    });
  });
});
