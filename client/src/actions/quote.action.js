import axios from "../helpers/axios"
import { quoteConstants } from "./constants"

export const quoteAction = (details) => {
    return (dispatch) => {

        dispatch({ type: quoteConstants.QUOTE_REQUEST })
        const res = axios.post('/quote', { ...details })

        res.then(response => {
            if (response.status === 201) {
            dispatch({ type: quoteConstants.QUOTE_SUCCESS,
                payload:{ message: response.data.message } 
            })
            }
        })

        res.catch((error) => {
            if(error.response) {
                if(error.response.status === 400 || error.response.status === 422) {
                    dispatch({ type: quoteConstants.QUOTE_FAILURE,
                        payload: { message: error.response.data.message || error.response.data.error }
                    })
                }
            }
        })
    }
}