import React from 'react';
import classes from './NavigationItem.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated
                ? <NavigationItem link="/orders" active={false}>Orders</NavigationItem>
                : null
            }

            {props.isAuthenticated
                ? <NavigationItem link="/logout" active={false}>Log Out</NavigationItem>
                : <NavigationItem link="/auth" active={false}>Authentication</NavigationItem>
            }
        </ul>
    );
};

export default navigationItems;