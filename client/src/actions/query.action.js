import axios from "../helpers/axios"
import { queryConstants } from "./constants"

export const queryAction = (details) => {
    return (dispatch) => {

        dispatch({ type: queryConstants.QUERY_REQUEST })
        const res = axios.post('/query', { ...details })

        res.then(response => {
            if (response.status === 201) {
            dispatch({ type: queryConstants.QUERY_SUCCESS,
                payload:{ message: response.data.message } 
            })
            }
        })

        res.catch((error) => {
            if(error.response) {
                if(error.response.status === 400 || error.response.status === 422) {
                    dispatch({ type: queryConstants.QUERY_FAILURE,
                        payload: { message: error.response.data.message || error.response.data.error }
                    })
                }
            }
        })
    }
}