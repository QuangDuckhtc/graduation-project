import { combineReducers } from 'redux';
import valueSearch from './valueSearch';
import isActive from './isActive';

const myReducer = combineReducers({
  valueSearch,
  isActive
})

export default myReducer