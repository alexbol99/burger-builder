import React, {Component} from 'react';
import classes from './Orders.css';
import axios from '../../axios-orders'
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as ordersActions from "../../store/actions/orders";
import connect from "react-redux/es/connect/connect";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
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

const mapStateToProps = ({orders}) => {
    return {
        orders: orders.orders,
        loading: orders.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(ordersActions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
