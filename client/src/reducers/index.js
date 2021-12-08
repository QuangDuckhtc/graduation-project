import { combineReducers } from 'redux';
import dataSchedule from './dataSchedule';
import valueSearch from './valueSearch';
import reloadSeat from './reloadSeat';
import reloadSeat1 from './reloadSeat1';
import reloadCart from './reloadCart';

const myReducer = combineReducers({
  dataSchedule,
  valueSearch,
  reloadSeat,
  reloadSeat1,
  reloadCart
})

export default myReducer