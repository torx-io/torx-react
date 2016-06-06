'use strict';
var React                 = require('react');
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import configureStore from '../../app/store/configureStore';
import routes from '../../app/routes';
import { Provider } from 'react-redux';

exports.notfound = function(req, res) {
  res.render('404');
};

exports.home = function(req, res) {
  //fetch initial state
  const store = configureStore();
  const initialState = store.getState();

  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const reactHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.render('index', {
        reactHtml: reactHtml,
        initialState: initialState
      });
    } else {
      res.render('404');
    }
  });
};
