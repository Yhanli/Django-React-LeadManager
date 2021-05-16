import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './landingpage.scss';
import {getLeads} from "../actions/leads";
import {URL_DASHBOARD} from "./routes"


class LandingPage extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool
    };
    componentDidMount() {
        this.props.getLeads({gameType:'pb'});
    }

    redirectRoute = () =>{
        return <Redirect to={URL_DASHBOARD} />;
    }

    mapChar = (str) =>{
        let chars = []
        for (let i = 0; i < str.length; i++) {
            chars.push({
                char:str[i],
                key:i+str[i]
            })
        }
        return chars;
    }

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to={URL_DASHBOARD} />;
        }
        return (
            <div className={'landing'}>
                <div className={`contents`}>
                    <div className={`main`}>
                        <div className={`landingTitle`}>
                            <h1>
                                {
                                    this.mapChar("Notifications That You Care About").map(char => (
                                            <span className={`hoverTitle`} key={char.key}>{char.char}</span>
                                        )
                                    )
                                }
                            </h1>
                        </div>

                        <br/>
                        <Link to={URL_DASHBOARD}><button className={`button`} onClick={this.redirectRoute}>Let's Get Started</button></Link>
                    </div>

                    <p>We have {this.props.leads.length} subscriptions available so far, Amazing!</p>
                    <div className={`itemlogos`}>
                        {this.props.leads.map(lead => (
                            <div className={'gameLogo'} key={lead.id + lead.name}>
                                <a href={lead.official_site} target="_blank"><img src={lead.logo} className={`gameImg`}/></a>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    leads: state.leads.leads,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {getLeads})(LandingPage);