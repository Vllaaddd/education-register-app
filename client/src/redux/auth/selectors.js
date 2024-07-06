export const selectIsLoggedIn = state => {
    return state.auth.isLoggedIn;
}

export const selectIsAdmin = state => {
    return state.auth.user?.isAdmin
}

export const selectUser = state => {
    return state.auth.user
}

export const selectError = state => {
    return state.auth.error
}