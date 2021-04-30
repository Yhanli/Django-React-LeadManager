import React, {Component, useState, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLeads,deleteLead, getSubGames, addLead} from "../../actions/leads";

import "./games.scss";

class Leads extends Component {
    static propTypes= {
        leads: PropTypes.array.isRequired,
        sub_games: PropTypes.any.isRequired,
        getLeads: PropTypes.func.isRequired,
        getSubGames: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired,
        addLead: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.state={
            subGames:""
        }

    }
    
    componentDidMount() {
        this.props.getLeads();
        this.props.getSubGames();
        setTimeout(() => {
            this.checkSubGames(this.props.sub_games.subGames)
        }, 500)
        //

    }

    subscribe = (id, e) =>{
        const checked = e.target.checked;
        if (checked){
            this.props.addLead(id);
        }
        else{
            this.props.deleteLead(id);
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

    render() {
        return (
            <Fragment>
                <h2> Games to Subscribe </h2>
                <table className={`gameTable`}>
                    <thead>
                    <tr className={'headerRow'}>
                        <th></th>
                        <th>Description</th>
                        <th>Subscribed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.leads.map(lead => (
                        <tr key={lead.id} className={`gameRow`}>
                            <td className={'gameLogo'}>
                                <a href={lead.official_site}><img src={lead.logo} className={`gameImg`}/></a>
                            </td>
                            <td className={'gameDescription'}>
                                <p>{lead.descriptions}</p>
                            </td>
                            <td className={'subCheckBox'}>
                                <input type="checkbox" id={`game_${lead.id}`} name={lead.name} value={lead.name}
                                    onChange={e => this.subscribe(lead.id, e)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/*<table className="table table-striped">*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>ID</th>*/}
                {/*        <th>Name</th>*/}
                {/*        <th>Email</th>*/}
                {/*        <th>Message</th>*/}
                {/*        <th />*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {this.props.leads.map(leads=> (*/}
                {/*        <tr key={leads.id}>*/}
                {/*            <td>{leads.id}</td>*/}
                {/*            <td>{leads.name}</td>*/}
                {/*            <td>{leads.email}</td>*/}
                {/*            <td>{leads.message}</td>*/}
                {/*            <td>*/}
                {/*                <button*/}
                {/*                    onClick={this.props.deleteLead.bind(this,leads.id)}*/}
                {/*                    className="btn btn-danger btn-sm">DELETE</button>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*    ))}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </Fragment>
        );
    }
}

const mapStateToProps = state=> ({
    leads: state.leads.leads,
    sub_games: state.leads.sub_games
});

export default connect(mapStateToProps, {getLeads,deleteLead,getSubGames,addLead})(Leads);