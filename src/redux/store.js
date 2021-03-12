import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../redux/reducers/index';

const persistedStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  const persistore = persistStore(store);
  return {persistore, store};
};

export default persistedStore;
