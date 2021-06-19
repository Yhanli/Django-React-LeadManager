import React, {Component, useState, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLeads,deleteLead, getSubGames, addLead,pendMessage,createLead} from "../../actions/leads";
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
        pendMessage:PropTypes.func.isRequired,
        createLead:PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.state={
            subGames:"",
            changedSubGame:false,
            email:"",
            username:"",
            showModal: false,
            formTitle: "",
            editTitle: "",
            editUrl: "",
            editDescription: "",
            editId: "",
            editImage:""
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

    hideModalAction = e =>{
        const element = document.getElementById('form-div')
        element.classList.remove("modal-active");
        this.setState({showModal: false});
    }

    showModalAction = (lead) =>{
        const element = document.getElementById('form-div')
        if (lead.record_type === 'pb'){
                this.props.pendMessage('Unable to edit public notification', -1);
        }else if(lead !== -1){
            this.setState({
                formTitle: "Make change to " + lead.name,
                editTitle: lead.name,
                editUrl: lead.official_site,
                editDescription:lead.descriptions,
                editId: lead.id
            })
        }else{
            this.setState({
                formTitle: "Add new notification task",
                editTitle: "",
                editUrl: "",
                editDescription:"",
                editId: "",
                editImage:""
            })
        }
        if (lead.record_type !== "pb"){
            element.classList.add("modal-active");
            this.setState({showModal: true});
        }
    }

    triggerChange = e => {
        const {username, email} = this.state;
        // console.log(email);
        this.props.updateEmail({username, email})
    }
    onSubmit = e => {
        e.preventDefault();
    }

    notificationSubmit = e =>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('logo', this.state.editImage)
        form_data.append('name',this.state.editTitle)
        form_data.append('descriptions',this.state.editDescription)
        form_data.append('id',this.state.editId)
        form_data.append('official_site',this.state.editUrl)
        this.props.createLead(form_data)
        // window.location.reload();
        this.hideModalAction()
    }

    onInputchange = e =>{
        // if (e.target.files) console.log(e.target.files[0])
        if (e.target.name === 'editImage'){
            this.setState({
                [e.target.name]: e.target.files[0]
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }


    }

    render() {
        const {email} = this.state;
        const {isAuthenticated,user} = this.props.auth;
        return (
            <Fragment>
                <div className={`tableHeader`}>
                    <button className={`btn-form`}
                            onClick={this.showModalAction.bind(this,-1)}
                    >Add New</button>

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
                    {this.props.leads.filter(lead=>lead.record_type !== 'pb').map(lead => (
                        <tr key={lead.id} className={`gameRow`} >
                            <td className={'gameLogo'} onClick={this.showModalAction.bind(this,lead)}>
                                <a href={lead.official_site} target="_blank"><img src={lead.logo} className={`gameImg`}/></a>
                            </td>
                            <td className={'gameDescription'} onClick={this.showModalAction.bind(this,lead)}>
                                <p>{lead.name}<br/>{lead.descriptions}</p>
                            </td>
                            <td className={'subCheckBox'}>
                                <input type="checkbox" id={`game_${lead.id}`} name={lead.name} value={lead.name}
                                    onChange={e => this.subscribe(lead.id, lead.name, e)}
                                />
                            </td>
                        </tr>
                    ))}
                    {this.props.leads.filter(lead=>lead.record_type === 'pb').map(lead => (
                        <tr key={lead.id} className={`gameRow`} >
                            <td className={'gameLogo'} onClick={this.showModalAction.bind(this,lead)}>
                                <a href={lead.official_site} target="_blank"><img src={lead.logo} className={`gameImg`}/></a>
                            </td>
                            <td className={'gameDescription'} onClick={this.showModalAction.bind(this,lead)}>
                                <p>{lead.name}<br/>{lead.descriptions}</p>
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
                <div id='form-div' className={`sub-edit-form`}>
                    <div className='form-bg' onClick={this.hideModalAction}/>
                    <form className={`form-edit`} onSubmit={this.notificationSubmit}>
                        <h3 id='form-title'>{this.state.formTitle}</h3>
                        <br/>
                        <label>Title</label>
                        <br/>
                        <input id='edit-title' type='text' name='editTitle' placeholder='Task Title'
                                value={this.state.editTitle}
                                onChange={this.onInputchange}
                        />
                        <br/>
                        <label>Target url</label>
                        <br/>
                        <input id='edit-url' type='url' name='editUrl' placeholder='target site Url'
                               value={this.state.editUrl}
                               onChange={this.onInputchange}
                        />
                        <br/>
                        <label>Description</label>
                        <br/>
                        <textarea id='edit-description' name='editDescription' placeholder='give it a simple description'
                                  value={this.state.editDescription}
                                  onChange={this.onInputchange}
                        />
                        <br/>
                        <label>Site logo</label>
                        <input type="file" id="notification_img" name="editImage"
                               onChange={this.onInputchange}
                        />
                        <br/>
                        <button type="submit" className={`btn-form`}>Submit</button>
                        {/*<button type="cancel" className={`btn-form`}*/}
                        {/*onClick={this.hideModalAction}*/}
                        {/*>Cancel</button>*/}
                    </form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state=> ({
    leads: state.leads.leads,
    sub_games: state.leads.sub_games,
    auth: state.auth
});

export default connect(mapStateToProps, {getLeads,deleteLead,getSubGames,addLead,updateEmail,pendMessage,createLead})(Leads);