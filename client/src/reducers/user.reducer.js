// import { signupConstants } from "../actions/constants"

// /* eslint-disable import/no-anonymous-default-export */
// const initState = {
//     error: '',
//     message: '',
//     loading: ''
// }

// export default (state = initState, action ) => {
//     switch(action.type){
//         case signupConstants.SIGNUP_REQUEST:
//             state = {
//                 ...state,
//                 loading: true
//             }
//         break;

//         case signupConstants.SIGNUP_SUCCESS:
//             state = {
//                 ...state,
//                 loading: "Done",
//                 message: action.payload.message
//             }
//         break;

//         case signupConstants.SIGNUP_FAILURE:
//             state = {
//                 ...state,
//                 loading: "Failed",
//                 error: action.payload.error
//             }
//         break;

//         default: return state;
//     }
//     return state;
// }