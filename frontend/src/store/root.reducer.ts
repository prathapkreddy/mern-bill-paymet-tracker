import { combineReducers } from '@reduxjs/toolkit';
import modalsReducer from './slices/modals.slice';
import accountInfoReducer from './slices/account.info.slice';
import apiReducer from './slices/api.slice';

const appReducer = combineReducers({
    modals: modalsReducer,
    accountInfo: accountInfoReducer,
    api: apiReducer
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'auth/logout') {
        state = undefined; 
    }
    return appReducer(state, action);
};

export default rootReducer;
