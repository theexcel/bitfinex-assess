
import { legacy_createStore as createStore, combineReducers } from 'redux';
import orderBookReducer from '../reducer/reducers';

const rootReducer = combineReducers({
  orderBook: orderBookReducer,
});

const store = createStore(rootReducer);

export default store;
