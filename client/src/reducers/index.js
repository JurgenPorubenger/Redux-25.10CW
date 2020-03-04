import { combineReducers } from 'redux';

import appReducer from './appReducer';

export default combineReducers({
  firstState: appReducer
});
