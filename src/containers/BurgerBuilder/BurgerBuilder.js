import React,{Component, Fragment} from 'react'
import Burger from "../../components/Burger/Burger";
// import BurgerIngredients from "../../components/Burger/BurgerIngredients/BurgerIngredients";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
    };

    moreIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedTotalPrice
        });
    };

    lessIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0)
            return;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedTotalPrice
        });
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
        alert("Continue")
    }

    isOrderPurchasable() {
        let orderPurchasable = false;
        for (let type of Object.keys(this.state.ingredients)) {
            if (this.state.ingredients[type] > 0) {
                orderPurchasable = true;
                break;
            }
        }
        return orderPurchasable;
    }

    render() {
        let orderPurchasable=this.isOrderPurchasable();
        return (
            <Fragment>

                <Modal show={this.state.purchasing} onBackdropClicked={this.purchaseCanceledHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        onCancelButtonClicked={this.purchaseCanceledHandler}
                        onContinueButtonClicked={this.purchaseContinueHandler}
                    />
                </Modal>

                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    orderPurchasable={orderPurchasable}
                    onClickLess={this.lessIngredientHandler}
                    onClickMore={this.moreIngredientHandler}
                    onOrderButtonClicked={this.purchaseHandler}
                />
            </Fragment>
        )
    }
}

export default BurgerBuilder;