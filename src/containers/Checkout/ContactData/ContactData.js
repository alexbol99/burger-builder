import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

import classes from './ContactData.css';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/orders";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: true
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: "Fastest"},
                        {value: 'cheapest', displayValue: "Cheapest"}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        // loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loading: true});
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        // axios.post('/orders.json', orders)
        //     .then( response => {
        //         // console.log(response)
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch( error => {
        //         console.log(error);
        //         this.setState({
        //             loading: false
        //         });
        //     });

        this.props.onOrderBurger(order);
    };

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {         // shallow clone the first level
            ...this.state.orderForm
        };
        const updatedOrderFormElement = {  // shallow clone the nested level
            ...updatedOrderForm[inputId]
        };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid =
            this.isValid(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderForm[inputId] = updatedOrderFormElement;
        this.setState({orderForm: updatedOrderForm});   // works also without setState ??
    };

    isValid(value, rules) {
        if (!rules)
            return true;

        if (rules.required && value.trim() === '')
            return false;

        if (rules.minLength && value.length < rules.minLength)
            return false;

        if (rules.maxLength && value.length > rules.maxLength)
            return false;

        return true;
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
                })
        }
        let notValidElement = formElementsArray.find( (formElement) =>
            !this.isValid(formElement.config.value, formElement.config.validation));
        let disabled = notValidElement ? true : false;

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map( formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        defaultValue={formElement.config.value}
                        valid={formElement.config.valid}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={disabled}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form=<Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = ({burgerBuilder, orders}) => {
    return {
        ingredients: burgerBuilder.ingredients,
        price: burgerBuilder.totalPrice,
        loading: orders.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
