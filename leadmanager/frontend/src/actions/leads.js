import axios from 'axios';
import {createMessage,returnErrors} from "./messages";
import {GET_LEADS, DELETE_LEADS, ADD_LEADS, GET_ERRORS, GET_SUBGAMES} from "./types";

import {tokenConfig} from "./auth";

// GET LEADS

export const getLeads = () => (dispatch, getState) => {
    axios.get('/api/games/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_LEADS,
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

// DELETE LEAD

export const deleteLead = id => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteLead: "Game Unsubscribed"}));
            dispatch({
                type:DELETE_LEADS,
                payload: id
            });
        }).catch(
        err => console.log(err)
    );

};

// ADD LEAD

export const addLead = (lead) => (dispatch, getState) => {
    axios.post('/api/leads/', lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addLead: "Game Subscribed"}));
            dispatch({
                type:ADD_LEADS,
                payload: res.data
            });
        }).catch(
        err => dispatch(returnErrors(err.response.data,err.response.status))
    );

};