import {userActionType} from '../actions/userAction'

const initialState = {
  user: null
}

export default function (state = initialState, action) {
  switch (action.type) {
  case userActionType.SET_USER: {
    const { user } = action.payload
    return {
      user
    }
  }
  default:
    return state
  }
}
