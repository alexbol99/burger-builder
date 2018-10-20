import React from 'react';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';

import styles from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tested well</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" onClick={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" onClick={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;