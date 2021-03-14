import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import friendReducer from './friend';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import authReducer from './auth';
import chatReducer from './chatMessage';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  friend: friendReducer,
  messageList: chatReducer,
});

export default reducer;
