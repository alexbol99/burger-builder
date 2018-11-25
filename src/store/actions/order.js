import * as actionTypes from './actionTypes';

export const purchaseBurgerSucceed = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCEED,
        orderId,
        orderData
    }
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error
    }
}
