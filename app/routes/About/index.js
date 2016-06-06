if (typeof require.ensure !== 'function') {
  require.ensure = require('isomorphic-ensure')({

    // If you want to use loaders, pass them through options:
    // loaders: {
    //   raw: require('raw-loader'),
    //   json: require('json-loader')
    // },

    // If you require local files, pass the current location:
    dirname: __dirname
  });
}
module.exports = {
  path: 'about',
  getComponent(location, callback) {
    require.ensure([], function(require) {
      callback(null, require('./components/AboutContainer'));
    });
  }
};
