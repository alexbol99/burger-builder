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
import * as actionType from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        // ingredients: {},
        // totalPrice: 4,
        purchasing: false,
        loading: false
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
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
        // const order = {
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
        // axios.post('/orders.json', order)
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

        this.props.history.push("/checkout");
    };

    isOrderPurchasable() {
        let orderPurchasable = false;
        for (let type of Object.keys(this.props.ingredients)) {
            if (this.props.ingredients[type] > 0) {
                orderPurchasable = true;
                break;
            }
        }
        return orderPurchasable;
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then( resp => {
        //         this.setState({ingredients: resp.data})
        //     })
        //     .catch( error => {
        //         console.log(error)
        //     })
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
                    onClickMore={this.props.onIngredientAdded}
                    onClickLess={this.props.onIngredientRemoved}
                    onOrderButtonClicked={this.purchaseHandler}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type:actionType.ADD_INGREDIENT, ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({type:actionType.REMOVE_INGREDIENT, ingredientName})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));