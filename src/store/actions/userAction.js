const userActionType = {
    UPDATE: 'update user info',
    SET_USER: 'set user infomation',
}

const updateUserInfo = userInfo => ({
    type: userActionType.SET_USER,
    payload: {
      user: userInfo,
    },
})
  
const setUserInfo = user => ({
    type: userActionType.SET_USER,
    payload: {
      user,
    },
})

export {
    userActionType,
    updateUserInfo,
    setUserInfo
}