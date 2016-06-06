import { applyMiddleware, compose, createStore} from 'redux';
import DevTools from '../components/DevTools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const createStoreWithMiddleware = compose(
  // Enables your middleware:
  applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument() //
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
