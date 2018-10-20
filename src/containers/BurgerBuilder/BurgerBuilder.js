import React,{Component, Fragment} from 'react'
import Burger from "../../components/Burger/Burger";
// import BurgerIngredients from "../../components/Burger/BurgerIngredients/BurgerIngredients";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {},
        totalPrice: 4,
        purchasing: false,
        loading: false
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
        const queryParams=[];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);

        const queryString=queryParams.join('&');
        this.props.history.push({
            pathname:"/checkout",
            search: '&' + queryString
        });
    };

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

    componentDidMount() {
        axios.get('/ingredients.json')
            .then( resp => {
                this.setState({ingredients: resp.data})
            })
            .catch( error => {
                console.log(error)
            })
    }

    render() {
        let orderPurchasable=this.isOrderPurchasable();
        return (
            <Fragment>

                <Modal show={this.state.purchasing} onBackdropClicked={this.purchaseCanceledHandler}>
                    {this.state.loading ? (
                        <Spinner/>) : (
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            onCancelButtonClicked={this.purchaseCanceledHandler}
                            onContinueButtonClicked={this.purchaseContinueHandler}
                        />)
                    }
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

export default withErrorHandler(BurgerBuilder, axios);