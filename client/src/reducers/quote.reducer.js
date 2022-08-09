import { quoteConstants } from "../actions/constants"

/* eslint-disable import/no-anonymous-default-export */
const initState = {
    message: '',
    error: '',
    loading: ''
}

export default (state = initState, action) => {
    switch(action.type) {
        case quoteConstants.QUOTE_REQUEST: 
            state = {
                ...state,
                loading: true
            }
        break;

        case quoteConstants.QUOTE_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                loading: false
            }
        break;

        case quoteConstants.QUOTE_FAILURE:
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