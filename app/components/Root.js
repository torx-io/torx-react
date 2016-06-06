if (process.env.NODE_ENV === 'production') {
  module.exports = require('./RootProd');
} else {
  module.exports = require('./RootDev');
}
