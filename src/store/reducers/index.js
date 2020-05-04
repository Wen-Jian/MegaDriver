import { combineReducers } from 'redux'
import user from './userReducer'
import sessionChecker from './logincheckerReducer'

export default combineReducers({
    user,
    sessionChecker
})