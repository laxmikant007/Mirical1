import axios from '../helpers/axios'
import { authConstants, signupConstants } from './constants'

export const signup = (userData) => {
    return dispatch => {
        dispatch({ type: signupConstants.SIGNUP_REQUEST })
        const res = axios.post('/signup', { ...userData })

        res.then(response => {
            dispatch({ type: signupConstants.SIGNUP_SUCCESS,
                payload: { message: response.data.message }
            })
        })

        res.catch(error => {
            dispatch({ type: signupConstants.SIGNUP_FAILURE,
                payload: { error: error.response.data.error  }
            })
        })
    }
}

export const login = (user) => {
    return dispatch => {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = axios.post('/signin', { ...user })

        res.then(response => {
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: authConstants.LOGIN_SUCCESS,
                payload: { token, user }
            })
        })

        res.catch(error => {
            dispatch({ type: authConstants.LOGIN_FAILURE,
                payload: { error: error.response.data.error }
            })
        })
    }
}

export const isLoggedin = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"))

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user }
            });
        }
    }
}

export const logout = () => {
    return dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST })
        const res = axios.post(`/signout`)

        res.then(response => {
            if (response.status === 200) {
                localStorage.clear();
                dispatch({ type: authConstants.LOGOUT_SUCCESS })
            }
        })

        res.catch((error) => {
            if(error.response) {
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    payload: { error: error.response.data.error }
                })
            }
        })
    }
}