import React, {Component, useState, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLeads,deleteLead, getSubGames, addLead} from "../../actions/leads";
import {updateEmail} from "../../actions/auth";

import "./games.scss";


const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class Leads extends Component {
    static propTypes= {
        leads: PropTypes.array.isRequired,
        sub_games: PropTypes.any.isRequired,
        getLeads: PropTypes.func.isRequired,
        getSubGames: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired,
        addLead: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        updateEmail:PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state={
            subGames:"",
            changedSubGame:false,
            email:"",
            username:""
        }

    }
    
    componentDidMount() {
        this.timer = null;

        this.props.getLeads({gameType:'pb', user:this.props.auth.user});
        this.props.getSubGames();

        for (let i=0; i<50; i++){
            setTimeout(() => {
                if (this.props.sub_games.id !== undefined && !this.state.changedSubGame){
                    this.checkSubGames(this.props.sub_games.subGames);
                    this.setState({'email':this.props.auth.user.email});
                    this.setState({'username':this.props.auth.user.username});
                    this.setState({email:this.props.auth.user.email})
                    if (i > 7){
                        this.setState({'changedSubGame':true});
                    }
                }
            }, 100 * i);

        }

    }

    subscribe = (id, name, e) =>{
        const checked = e.target.checked;
        if (checked){
            this.props.addLead(id,name);
        }
        else{
            this.props.deleteLead(id, name);
        }
    }

    checkSubGames = (string) =>{
        const split_str = string.split("|")
        for (let i = 0; i < split_str.length - 1; i++){
            const game = document.getElementById(`game_${split_str[i].replace('*','')}`)
            if (game){
                game.checked=true;
            }

        }
    }

    handleChange= e => {
        clearTimeout(this.timer);
        this.setState({
            [e.target.name]: e.target.value
        });

        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    }


    triggerChange = e => {
        const {username, email} = this.state;
        // console.log(email);
        this.props.updateEmail({username, email})
    }
    onSubmit = e => {
        e.preventDefault();
    }

    render() {
        const {email} = this.state;
        const {isAuthenticated,user} = this.props.auth;
        return (
            <Fragment>
                <div className={`tableHeader`}>
                    <h2> Click to Subscribe </h2>

                    <form onSubmit={this.onSubmit}>
                        {/*<div className="form-group">*/}
                        <span>
                            <label>Notify Email:</label>
                            <input
                                type="text"
                                className="emailInput"
                                name="email"
                                placeholder="Notify this email"
                                onChange={this.handleChange}
                                value={user? email : ""}
                            />
                        </span>
                        {/*</div>*/}
                    </form>
            </div>

                <table className={`gameTable`}>
                    <thead>
                    <tr className={'headerRow'}>
                        <th></th>
                        <th>Description</th>
                        <th>Subscribed</th>
                    </tr>
                    </thead>
                    <tbody id={`tablebody`}>
                    {this.props.leads.map(lead => (
                        <tr key={lead.id} className={`gameRow`}>
                            <td className={'gameLogo'}>
                                <a href={lead.official_site} target="_blank"><img src={lead.logo} className={`gameImg`}/></a>
                            </td>
                            <td className={'gameDescription'}>
                                <p>{lead.descriptions}</p>
                            </td>
                            <td className={'subCheckBox'}>
                                <input type="checkbox" id={`game_${lead.id}`} name={lead.name} value={lead.name}
                                    onChange={e => this.subscribe(lead.id, lead.name, e)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = state=> ({
    leads: state.leads.leads,
    sub_games: state.leads.sub_games,
    auth: state.auth
});

export default connect(mapStateToProps, {getLeads,deleteLead,getSubGames,addLead,updateEmail})(Leads);