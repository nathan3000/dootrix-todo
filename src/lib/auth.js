const TOKEN_NAME = 'jwtToken'

export function getToken() {
    return localStorage.getItem(TOKEN_NAME)
}

export function setToken(token) {
    localStorage.setItem(TOKEN_NAME, token)
}

export function hasToken() {
    return !!getToken()
}

export default {
    getToken,
    setToken,
    hasToken
}