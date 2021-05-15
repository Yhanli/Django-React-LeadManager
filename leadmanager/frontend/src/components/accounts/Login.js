import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {login} from '../../actions/auth';
import './../layout/layout.scss';
import {URL_DASHBOARD, URL_REGISTER} from "./../routes"


class Login extends Component {
    state = {
        username:"",
        password:"",
        email:""
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username.toLowerCase(), this.state.password);
    };

    onChange = e => this.setState({[
            e.target.name]: e.target.value
    });

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to={URL_DASHBOARD} />;
        }
        const {username, password} = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <p>Login to manage your website/app subscription</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="User Name"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary roundButton">
                                Login
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link to={URL_REGISTER}>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);