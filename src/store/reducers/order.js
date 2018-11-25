import * as actionTypes from '../actions/actionTypes';

const initialState = {

};

const order = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCEED:
            return state;
        case actionTypes.PURCHASE_BURGER_FAILED:
            return state;
        default:
            return state;
    }
};

export default order;

