import { LOCAL_LOGIN, LOGIN, SIGN_OUT} from '../types';
const initialState = {
    user:null,
    token:null,
    user_type:null,
    placement_approver_module_id:null,
    placement_approver_module_pk_id:null,
    is_logged_in:false
};
const LoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            console.log(action.payload);
            return {
                ...state,
                user:action.payload.data,
                token:action.payload.access_token,
                user_type:action.payload.type,
                placement_approver_module_id:action.payload.placement_approver_module_id,
                placement_approver_module_pk_id:action.payload.placement_approver_module_pk_id,
                is_logged_in:true,
            };
        case LOCAL_LOGIN:
            return{
                ...state,
                user:action.payload.data,
                token:action.payload.access_token,
                user_type:action.payload.type,
                placement_approver_module_id:action.payload.placement_approver_module_id,
                placement_approver_module_pk_id:action.payload.placement_approver_module_pk_id,
                is_logged_in:true,
            }
        case SIGN_OUT:
            return{
                ...state,
                user:null,
                user_type:null, 
                token:null,
                is_logged_in:false
            }
        default:
            return state;
        }
    }
export default LoginReducer;