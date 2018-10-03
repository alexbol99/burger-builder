import React from 'react';
import classes from './NavigationItem.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
            <NavigationItem link="/" active={false}>Checkout</NavigationItem>
        </ul>
    );
};

export default navigationItems;