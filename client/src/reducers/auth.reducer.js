/* eslint-disable import/no-anonymous-default-export */
import { authConstants, signupConstants, userConstants } from '../actions/constants'

const initState = {
    token: null,
    user: {
        _id: "" ,
        firstName: "", 
        lastName: "", 
        fullName: "", 
        email: "", 
        user_name: "", 
        contact: "", 
        blogs: "", 
        role: "", 
        funFact: "", 
        followers: [],
        followings: [],
        socialLinks: ""
    },
    error: null,
    authenticating: false,
    authenticate: false,
    message: '',
    loading: '',
    success: false
}

export default (state = initState, action) => {
    console.log(action)
    switch(action.type) {
        case signupConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;

        case signupConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
        break;

        case signupConstants.SIGNUP_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        break;

        case authConstants.LOGIN_REQUEST:
          state = {
              ...state,
              authenticating: true,
              loading: true
          }
        break;

        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                authenticating: false,
                authenticate: true,
                loading: false,
            }
        break;

        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                authenticating: false,
                error: action.payload.error,
                loading: false
            }
        break;

        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;

        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState,
                loading: false,
                success: true
            }
        break;

        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.message
            }
        break;

        case userConstants.FOLLOW_USER_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;

        case userConstants.FOLLOW_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
        break;

        case userConstants.FOLLOW_USER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        break;

        default: return state;
    }

    return state;
}