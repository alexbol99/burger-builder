import React, {Component} from 'react';
import { Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0.0
    };

    checkoutCancelled = () => {
        this.props.history.goBack();
    };
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            // ['salad','1']
            if (param[0] === "price") {
                totalPrice = +param[1];
            }
            else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({
            ingredients:ingredients,
            totalPrice: totalPrice
        });
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                />
                <Route path={this.props.match.path + '/contact-data'}
                       render={ (props) => <ContactData {...props}
                           ingredients={this.state.ingredients}
                           price={this.state.totalPrice}
                       />} />
            </div>
        );
    }
}

export default Checkout;