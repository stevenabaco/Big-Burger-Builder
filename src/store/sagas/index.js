import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from "./auth";
import {initIngredientsSaga} from './burgerbuilder';
import { fetchOrdersSaga, purchaseBurgerSaga } from "./order";

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
	    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ])
}

export function* watchBurgerBuilder() {
    yield all([
        takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga),
    ])    
}

export function* watchOrders() {
    yield all([
        takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
        takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
    ])
}
