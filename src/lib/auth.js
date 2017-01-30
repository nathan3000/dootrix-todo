const TOKEN_NAME = 'jwtToken'

export function getToken() {
    if(typeof(Storage) !== "undefined") {
        return localStorage.getItem(TOKEN_NAME)
    }   
}

export function setToken(token) {
    if(typeof(Storage) !== "undefined") {
        localStorage.setItem(TOKEN_NAME, token)
    }
}

export function hasToken() {
    return !!getToken()
}

export default {
    getToken,
    setToken,
    hasToken
}