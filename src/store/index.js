import { createStore, combineReducers,applyMiddleware} from 'redux';
import LoginReducer from './reducers/LoginReducer';
import StatusReducer from './reducers/StatusReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        // whitelist: ['user','token','is_logged_in']
    };
    
    const rootReducer = combineReducers({
        StatusReducer:StatusReducer,
        LoginReducer:persistReducer(persistConfig, LoginReducer),
    });

    export const store =  createStore(rootReducer,applyMiddleware(thunk));
    export const persistor = persistStore(store);