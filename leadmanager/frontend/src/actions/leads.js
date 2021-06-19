import axios from 'axios';
import {createMessage,returnErrors} from "./messages";
import {GET_LEADS, DELETE_LEADS, ADD_LEADS, GET_ERRORS, GET_SUBGAMES} from "./types";

import {tokenConfig,mediaTokenConfig} from "./auth";

// GET NOTIFICATIONS

export const getLeads = (config) => (dispatch, getState) => {
    axios.get('/api/games/', {params:config}, tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_LEADS,
                payload: res.data
            });
        }).catch(
        err => dispatch(returnErrors(err.response.data,err.response.status))
    );

};

//CREATE NOTIFICATION

export const createLead = (lead) => (dispatch, getState) => {
    let message = 'Added ' + lead.get('name')  + ' in notification'
    if (lead.get('id') !== '') message = 'Changes has made to ' + lead.get('name')
    axios.post('/api/games/', lead, mediaTokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addLead: message}));
            dispatch(createMessage({addLead: 'Refresh page to see changes'}));
            dispatch({
                type:ADD_LEADS,
                payload: res.data
            });
        }).catch(
        err => dispatch(returnErrors(err.response.data,err.response.status))
    );

};

//GET SUBED GAMES
export const getSubGames = () =>(dispatch, getState) => {
    axios.get('/api/sub_games/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_SUBGAMES,
                payload: res.data
            });
        }).catch(
            err => dispatch(returnErrors(err.response.data, err.response.status))
    )
}

// DELETE LEAD SUBSCRIBE

export const deleteLead = (id, name) => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteLead: "Unsubscribed " + name}));
            dispatch({
                type:DELETE_LEADS,
                payload: id
            });
        }).catch(
        err => console.log(err)
    );

};

// ADD LEAD SUBSCRIBE

export const addLead = (lead, name) => (dispatch, getState) => {
    axios.post('/api/leads/', lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addLead: "Subscribed to " + name}));
            dispatch({
                type:ADD_LEADS,
                payload: res.data
            });
        }).catch(
        err => dispatch(returnErrors(err.response.data,err.response.status))
    );

};

export const pendMessage = (msg, status) => (dispatch, getState) =>{
    if (status !== -1) {dispatch(createMessage({success: msg}))}
    else{dispatch(createMessage({fail: msg}))}

};