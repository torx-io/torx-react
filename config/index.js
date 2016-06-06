var nodeEnv = process.env.NODE_ENV || 'development';
var config  = {
  development     : require('./development')//,
  // staging         : require('./staging'),
  // production      : require('./production'),
  // test            : require('./test')
};

module.exports = config[nodeEnv];
