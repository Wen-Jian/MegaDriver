export const checkerActionType = {
    CHECK_SESSION_LOGIN: 'check if the current session has logined'
}

const sessionChecker = boolean => ({
    type: checkerActionType.CHECK_SESSION_LOGIN,
    payload: boolean
})

export default sessionChecker