import {GET_STATUS} from '../types'
export const GetStatus =  (data) => {
    try{
        return async dispatch => {
            dispatch({
                type:GET_STATUS,
                payload:data
            })
        }
    }catch(e){
        console.log(e)
    }
}