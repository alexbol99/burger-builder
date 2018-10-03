import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button';

const toolbar = ( props ) => {
    return (
        <header className={classes.Toolbar}>
            <Button
                btnType="Success"
                onClick={props.onMenuButtonClicked}>
                <div style={{height:3,backgroundColor:"white"}}>---</div>
                <div style={{height:3,backgroundColor:"white"}}>---</div>
                <div style={{height:3,backgroundColor:"white"}}>---</div>
            </Button>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
};

export default toolbar;