import React from 'react';
import classes from './Order.css';

const order = (props) => {
    return (
        <div className={classes.Order}>
            Ingredients:
            <ul>
                {Object.keys(props.ingredients).map(name =>
                    <li key={name}>{name} - {props.ingredients[name]}</li>)}
            </ul>

            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;