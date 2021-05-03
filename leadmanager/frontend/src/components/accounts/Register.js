import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createMessage} from "../../actions/messages";

import {login, register} from '../../actions/auth'

class Register extends Component {
    state = {
        username:"",
        email: "",
        password:"",
        password2: ""
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({'username': this.state.username.toLowerCase()});
        const {username, email, password, password2} = this.state;
        const username_lower = username.toLowerCase();
        if (password !== password2){
            this.props.createMessage({passwordsNotMatch: "Passwords did not match"})
        }else{
            const newUser = {
                'username':username_lower,
                email,
                password
            };
            this.props.register(newUser);
        }
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to="/" />;
        }
        const {username, email, password, password2} = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <p className="text-center">The email will be used to receive subscribed game updates only.</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Your unique user name"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email to receive game notification"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Any length and style password you like, no restrictions applied."
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                placeholder="Confirm password entered above"
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
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

export default connect(mapStateToProps, {register, createMessage})(Register);