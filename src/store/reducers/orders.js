import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const orders = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_SUCCEED:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                purchased: true,
                loading: false
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PUCHASE_BURDER_STARTED:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_STARTED:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCEED:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default orders;

