import { GET_LEADS, DELETE_LEADS, ADD_LEADS, GET_SUBGAMES } from '../actions/types';

const initialState = {
    leads:[],
    sub_games:[]
};

export default function(state = initialState, action) {
    switch (action.type){
        case GET_LEADS:
            return {
                ...state,
                leads:action.payload
            };
        case GET_SUBGAMES:
            return {
                ...state,
                sub_games:action.payload
            };
        case DELETE_LEADS:
            return {
                ...state,
                // leads: state.leads.filter(lead => lead.id !== action.payload),
                leads: state.leads
            };
        case ADD_LEADS:
            return {
                ...state,
                leads: state.leads
                // leads: [...state.leads, action.payload]
            };
        default:
            return state;
    }
}