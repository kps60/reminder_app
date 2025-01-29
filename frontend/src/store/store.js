import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './userReducer';
import reminderReducer from './reminderReducer';

const rootReducer = combineReducers({
    user: userReducer,
    reminders: reminderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store; 