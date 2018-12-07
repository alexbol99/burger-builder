import React,{Fragment, Component} from "react";
import connect from "react-redux/es/connect/connect";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"
// import * as actions from "../../store/actions/orders";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    };

    sideDrawerOpenHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

    render() {
        return (
            <Fragment>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    onMenuButtonClicked={this.sideDrawerOpenHandler}
                />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = ({auth}) => {
    return {
        isAuthenticated: auth.token !== null
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
//     }
// };

export default connect(mapStateToProps, null)(Layout);
