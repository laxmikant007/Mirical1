import { newsletterConstants } from "../actions/constants"

/* eslint-disable import/no-anonymous-default-export */
const initState = {
    error: "",
    message: "",
    loading: ""
}

export default (state = initState, action) => {
    switch(action.type) {
        case newsletterConstants.NEWSLETTER_REQUEST: 
            state = {
                ...state,
                loading: true
            }
        break;

        case newsletterConstants.NEWSLETTER_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                loading: false
            }
        break;

        case newsletterConstants.NEWSLETTER_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
        break;

        default: return state;
    }
    return state;
}