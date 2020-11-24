import {combineReducers} from 'redux';
import authReducer from './authReducer';
import regisReducer from './regisReducer';

const rootReducer = combineReducers({
  authReducer,
  regisReducer,
});

export default rootReducer;
