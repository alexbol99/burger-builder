import React from "react"
import classes from "./BuildControls.css";
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price: <b>{props.totalPrice.toFixed(2)}</b></p>
        {controls.map( (control) => {
            return <BuildControl
                key={control.label}
                label={control.label}
                type={control.type}
                disabled={props.ingredients[control.type] === 0}
                onClickLess={props.onClickLess}
                onClickMore={props.onClickMore}
            />
        })}
        <button
            disabled={!props.orderPurchasable}
            className={classes.OrderButton}
            onClick={props.onOrderButtonClicked}
        >
            ORDER NOW:
        </button>
    </div>
);

export default buildControls;