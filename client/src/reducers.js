
import app from './modules/layouts/reducers/app';
import auth from './modules/auth/reducers/auth';
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    routing: routerReducer,
    app,
    auth
});

export default rootReducer;
