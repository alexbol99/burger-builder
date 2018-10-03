import React,{Fragment} from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map( type => {
            return (
                <li key={type}>
                    <span style={{textTransform: 'capitalize'}}>{type}</span>:
                    {props.ingredients[type]}
                </li>
            )
        });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Order price:<strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button
                btnType="Danger"
                onClick={props.onCancelButtonClicked}
            >
                CANCEL
            </Button>
            <Button
                btnType="Success"
                onClick={props.onContinueButtonClicked}
            >
                CONTINUE
            </Button>
        </Fragment>
    );
};

export default orderSummary;