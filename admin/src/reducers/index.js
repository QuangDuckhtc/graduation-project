import { combineReducers } from 'redux';
import valueSearch from './valueSearch';
import isActive from './isActive';
import idOrder from './idOrder';
import reloadData from './reloadData';

const myReducer = combineReducers({
  valueSearch,
  isActive,
  idOrder,
  reloadData,
})

export default myReducer