import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';

//generator function syntax
export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}