import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";

import classes from './ContactData.css';
class ContactData extends Component {
    state = {
        name:'',
        email:'',
        address:{
            street:'',
            zip:''
        },
        loading:false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: "Max Schwatz",
                address: {
                    street: "Dummy Street"
                },
                email: "a123@gmail.com",

            },
            deliveryMethod: "fastest"
        };
        axios.post('/orders.json', order)
            .then( response => {
                // console.log(response)
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch( error => {
                console.log(error);
                this.setState({
                    loading: false
                });
            });

    };
    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="You e-mail" />
                <input type="street" name="street" placeholder="Street" />
                <input type="text" name="zip" placeholder="Zip code" />
                <Button btnType="Success" onClick={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;