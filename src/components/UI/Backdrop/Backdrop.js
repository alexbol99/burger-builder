import React from 'react';
import classes from './Backdrops.css';

const backdrop = (props) => {
    return (
        props.show ? <div className={classes.Backdrop} onClick={props.onBackdropClicked}></div> : null
    );
};

export default backdrop;