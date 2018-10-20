import React from 'react';
import classes from './NavigationItem.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders" active={false}>Orders</NavigationItem>
        </ul>
    );
};

export default navigationItems;