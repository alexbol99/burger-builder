import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import { Redirect } from 'react-router-dom'

// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import axios from "../../axios-orders";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/auth';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: true,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: true,
                touched: false
            },
        },
        isSignUp: true
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls:updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp);
    };

    switchAuthModeHandler = (event) => {
        this.setState( prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    };

    render() {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        return (
            <div className={classes.AuthForm} >
                <form onSubmit={this.submitHandler}>
                    {
                        formElementsArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                valid={formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />))
                    }
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger"
                        onClick={this.switchAuthModeHandler}
                >
                    Switch to {this.state.isSignUp ? 'sign in' : 'sign up'}
                </Button>

                {this.props.loading ? <Spinner/> : null}

                {this.props.error ? <h4>{this.props.error.message}</h4> : null}

                {this.props.isAuthenticated ? <Redirect to="/" /> : null}
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        loading: auth.loading,
        error: auth.error,
        isAuthenticated: auth.token !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);