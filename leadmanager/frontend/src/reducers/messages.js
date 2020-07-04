import {GET_MESSAGES, CREATE_MESSAGE} from "../actions/types";
const initialState = {};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case CREATE_MESSAGE:
            return (state = action.payload);
        default:
            return state;
    }
}