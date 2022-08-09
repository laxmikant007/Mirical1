import { queryConstants } from "../actions/constants"

/* eslint-disable import/no-anonymous-default-export */
const initState = {
    message: '',
    error: '',
    loading: ''
}

export default (state = initState, action) => {
    switch(action.type) {
        case queryConstants.QUERY_REQUEST: 
            state = {
                ...state,
                loading: true
            }
        break;

        case queryConstants.QUERY_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                loading: false
            }
        break;

        case queryConstants.QUERY_FAILURE:
            state = {
                ...state,
                error: action.payload.message,
                loading: false
            }
        break;

        default: return state;
    }

    return state;
}