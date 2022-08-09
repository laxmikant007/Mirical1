import axios from '../helpers/axios'
import { newsletterConstants } from "./constants"

export const newsletter = (user) => {
    return (dispatch) => {

        dispatch({ type: newsletterConstants.NEWSLETTER_REQUEST })
        const res = axios.post('/newsletter', user)

        res.then(response => {
            if(response.status === 201) {
                dispatch({ type: newsletterConstants.NEWSLETTER_SUCCESS,
                    payload: { message: response.data.message }
                })
            }
        })

        res.catch((error) => {
            if(error.response) {
                if(error.response.status === 400 || error.response.status === 404 || error.response.status === 422) {
                    dispatch({ type: newsletterConstants.NEWSLETTER_FAILURE,
                        payload: { error: error.response.data.message || error.response.data.error }
                    })
                }
            }
        })
    }
}