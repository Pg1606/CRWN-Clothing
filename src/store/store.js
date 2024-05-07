import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
//import { thunk } from "redux-thunk";
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

//root-reducer

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log('type: ', action.type);
//   console.log('payload: ', action.payload);
//   console.log('currentState: ', store.getState());

//   next(action);

//   console.log('next state: ', store.getState());
// };

const persistConfig = {
  key: 'root',
  storage,
  //blacklist: ['user']
  whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const middleWares = [logger];//[loggerMiddleware]
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
//thunk
].filter(Boolean); //'production', 'development'

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);