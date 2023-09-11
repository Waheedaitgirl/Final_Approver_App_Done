import { LOGIN,LOCAL_LOGIN, SIGN_OUT } from "../types";
export const Login =  (data) => {
    try{
        return async dispatch => {
            dispatch({
                type:LOGIN,
                payload:data
            })
        }
    }catch(e){
        console.log(e)
    }
}

export const locallogin = (data) => {
    try{
        return async dispatch => {
            dispatch({
                type:LOCAL_LOGIN,
                payload:data
            })
        }
    }catch(e){
        console.log(e)
    }
}


export const Signout = () => {
    try{
       
        return async dispatch => {
            dispatch({
                type:SIGN_OUT,
            })
        }
    }catch(e){
        console.log(e)
    }
}