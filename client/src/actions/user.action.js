import axios from '../helpers/axios'
import { userConstants } from './constants'

export const followRequest = (authId, authorBody) => {
    return dispatch => {
        dispatch({ type: userConstants.FOLLOW_USER_REQUEST })
        const res = axios.put(`/user/followers/${authId}`, {...authorBody});

        res.then(response => {
                dispatch({ type: userConstants.FOLLOW_USER_SUCCESS,
                    payload: { message: response.data.message }
                })
        })

        res.catch(error => {
                dispatch({ type: userConstants.FOLLOW_USER_FAILURE,
                    payload: { error: error.response.data.error }
                })
        })
    }
}

export const unfollowRequest = (authId, authorId) => {
    return dispatch => {
        dispatch({ type: userConstants.FOLLOW_USER_REQUEST })
        const res = axios.put(`/user/remove/follower/${authId}`, authorId);

        res.then(response => {
                dispatch({ type: userConstants.FOLLOW_USER_SUCCESS,
                    payload: { message: response.data.message }
                })
        })

        res.catch(error => {
                dispatch({ type: userConstants.FOLLOW_USER_FAILURE,
                    payload: { error: error.response.data.error }
                })
        })
    }
}