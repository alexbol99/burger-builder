import React, {Fragment, Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.show !== nextProps.show
    }

    render() {
        return (<Fragment>
            <Backdrop show={this.props.show} onBackdropClicked={this.props.onBackdropClicked} />
            <div
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-500px)',
                    opacity: this.props.show ? 1 : 0
                }}
            >
                {this.props.children}
            </div>
        </Fragment>)
    }
}

export default Modal;