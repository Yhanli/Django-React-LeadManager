import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {logout} from "../../actions/auth";

import './layout.scss'

const WAIT_INTERVAL = 1500;
const ENTER_KEY = 13;

class Header extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };

    logoutAction = (e) =>{
        this.props.logout();
    }

    render() {
        const {isAuthenticated,user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <span className="navbar-text mr-3">
                    <strong>
                        {user? `Welcome ${user.username}`: ""}
                    </strong>
                </span>
                <li className="nav-item" >
                        <button
                            onClick={this.logoutAction}
                            className="nav-link btn btn-primary btn-sm text-light"
                            style={{
                                borderRadius:'10px'
                            }}
                        >Logout</button>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">{isAuthenticated ? "Subscription Manager" : "NotifyMe!"}</a>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Header);