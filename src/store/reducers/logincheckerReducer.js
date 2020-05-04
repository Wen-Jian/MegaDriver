import { checkerActionType } from '../actions/logincheckerAction'
const initialState = {
    loginChecked: false
}

export default function (state = initialState, action) {
    switch (action.type) {
    case checkerActionType.CHECK_SESSION_LOGIN: {
        const loginChecked = action.payload
        return {
            ...state,
            loginChecked
        }
    }
    default:
      return state
    }
}