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
  component: 'div',
  childRoutes: [{
    path: '/',
    component: require('../components/App'),
    indexRoute: {
      component: require('./IndexContainer')
    },
    childRoutes: [
      require('./About')
    ]
  }]
};
