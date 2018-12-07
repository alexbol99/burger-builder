import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PUCHASE_BURDER_STARTED
    }
};

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then( response => {
                dispatch(purchaseBurgerSucceed(response.data.name, orderData))
            })
            .catch( error => {
                dispatch(purchaseBurgerFailed(error))
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSucceed = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCEED,
        orders
    }
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error
    }
};

export const fetchOrdersStarted = () => {
    return {
        type: actionTypes.FETCH_ORDERS_STARTED
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStarted());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchOrders = []
                for(let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSucceed(fetchOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error))
            })
    }
}
