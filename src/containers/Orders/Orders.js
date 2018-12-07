import React, {Component} from 'react';
import classes from './Orders.css';
import axios from '../../axios-orders'
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as ordersActions from "../../store/actions/orders";
import connect from "react-redux/es/connect/connect";
import Spinner from "../../components/UI/Spinner/Spinner";
// import {auth} from "../../store/actions/auth";

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    render() {
        return (
            <div className={classes.Orders}>
                {this.props.loading ? <Spinner/> : null}
                {this.props.orders.map( order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({orders, auth}) => {
    return {
        orders: orders.orders,
        loading: orders.loading,
        token: auth.token,
        userId: auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(ordersActions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
