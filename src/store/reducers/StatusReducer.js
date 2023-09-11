import { GET_STATUS} from '../types';
const initialState = {
    status:[]
};
const StatusReducer = (state = initialState, action) => {
  
    switch(action.type) {
        case GET_STATUS:
            return {
                ...state,
                status:action.payload,
            };
        default:
            return state;
        }
    }
export default StatusReducer;