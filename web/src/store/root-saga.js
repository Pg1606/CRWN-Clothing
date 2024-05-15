import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';

//generator function syntax
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}