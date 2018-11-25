import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
     checkoutCancelled = () => {
        this.props.history.goBack();
    };
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients && Object.keys(this.props.ingredients).length > 0) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = ({burgerBuilder, orders}) => {
    return {
        ingredients: burgerBuilder.ingredients,
        purchased: orders.purchased
    }
};

export default connect(mapStateToProps)(Checkout);