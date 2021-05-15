import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';

import { Provider as AlertProvider} from 'react-alert';
import AlertTemplate from "./react-alert-template";

import Header from './layout/Header';
import Footer from './layout/Footer';
import Dashboard from "./leads/Dashboard"
import Alerts from './layout/Alerts';

import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import LandingPage from "./LandingPage"


import {Provider} from 'react-redux';
import store from '../store';
import {loadUser} from "../actions/auth";

import favicon from './favicon.png';

import {URL_DASHBOARD, URL_HOME, URL_LOGIN, URL_REGISTER} from "./routes"

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center'
};

class App extends Component {
    componentDidMount() { // fires off whenever the component mounted to the main app
        store.dispatch(loadUser());
    }
    
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <BrowserRouter>
                        <Fragment>
                            <script>
                            {document.getElementById("favicon").href = favicon}
                            </script>
                            <Header />
                            <Alerts />
                            <div className = "container" >
                                <Switch>
                                    <Route exact path={URL_HOME} component={LandingPage} />
                                    <PrivateRoute exact path={URL_DASHBOARD} component={Dashboard} />
                                    <Route exact path={URL_REGISTER} component={Register} />
                                    <Route exact path={URL_LOGIN} component={Login} />
                                </Switch>
                            </div>
                            <Footer/>
                        </Fragment>
                    </BrowserRouter>
                </AlertProvider>
            </Provider>
        );
    }
}

    ReactDOM.render(
        <App/>
    , document.getElementById('app'));
