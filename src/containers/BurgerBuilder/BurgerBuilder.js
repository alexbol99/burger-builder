import React,{Component, Fragment} from 'react'
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
// import BurgerIngredients from "../../components/Burger/BurgerIngredients/BurgerIngredients";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/burgerBuilder';
import * as ordersActions from '../../store/actions/orders';

class BurgerBuilder extends Component {
    state = {
        // ingredients: {},
        // totalPrice: 4,
        purchasing: false,
        loading: false
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        }
        else {
            this.props.history.push('/auth')
        }
    };

    purchaseCanceledHandler = () => {
        this.setState({
            purchasing: false
        })
    };

    purchaseContinueHandler = () => {
        // this.setState({
        //     purchasing: false
        // })
        // const orders = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Max Schwatz",
        //         address: {
        //             street: "Dummy Street"
        //         },
        //         email: "a123@gmail.com",
        //
        //     },
        //     deliveryMethod: "fastest"
        // };
        // axios.post('/orders.json', orders)
        //     .then( response => {
        //         // console.log(response)
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        //     .catch( error => {
        //         console.log(error);
        //         this.setState({
        //             loading: false,
        //             purchasing: true
        //         });
        //     });
        // this.setState({
        //     loading: true
        // });


        // const queryParams=[];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.props.totalPrice);
        //
        // const queryString=queryParams.join('&');
        // this.props.history.push({
        //     pathname:"/checkout",
        //     search: '&' + queryString
        // });

        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    };

    isOrderPurchasable() {
        let orderPurchasable = false;
        if (this.props.ingredients) {
            for (let type of Object.keys(this.props.ingredients)) {
                if (this.props.ingredients[type] > 0) {
                    orderPurchasable = true;
                    break;
                }
            }
        }
        return orderPurchasable;
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    render() {
        let orderPurchasable=this.isOrderPurchasable();
        return (
            <Fragment>

                <Modal show={this.state.purchasing} onBackdropClicked={this.purchaseCanceledHandler}>
                    {this.state.loading ? (
                        <Spinner/>) : (
                        <OrderSummary
                            ingredients={this.props.ingredients}
                            totalPrice={this.props.totalPrice}
                            onCancelButtonClicked={this.purchaseCanceledHandler}
                            onContinueButtonClicked={this.purchaseContinueHandler}
                        />)
                    }
                </Modal>

                <Burger ingredients={this.props.ingredients}/>

                <BuildControls
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.totalPrice}
                    orderPurchasable={orderPurchasable}
                    isAuthenticated={this.props.isAuthenticated}
                    onClickMore={this.props.onIngredientAdded}
                    onClickLess={this.props.onIngredientRemoved}
                    onOrderButtonClicked={this.purchaseHandler}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = ({burgerBuilder, auth}) => {
    return {
        ingredients: burgerBuilder.ingredients,
        totalPrice: burgerBuilder.totalPrice,
        error: burgerBuilder.error,
        isAuthenticated: auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(ordersActions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
// export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);