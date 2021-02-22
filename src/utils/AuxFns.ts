import Cookies from 'js-cookie'

export const fetchData = async (method: string, endpoint: string, body?: object) => {
    const response = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            "Authorization": `Basic ${getToken()}`
        },
    });
    return await response.json();
};

export const setAuthData = (token: string, login: string, superuser: boolean) => {
    return Cookies.set('authData', JSON.stringify({
        "login": login,
        "token": token,
        "superuser": superuser
    }), {expires: 1})
}

export const isAuthorized = () => {
    return !!Cookies.get('authData')
}

export const isAdmin = () => {
    let result = Cookies.get('authData')
    if (result) {
        return JSON.parse(result).superuser
    }
    return false
}

export const getLogin = () => {
    let result = Cookies.get('authData')
    if (result) {
        return JSON.parse(result).login
    }
    return ""
}

export const getToken = () => {
    let result = Cookies.get('authData')
    if (result) {
        return JSON.parse(result).token
    }
    return ""
}

export const removeAuthData = () => {
    Cookies.remove('authData')
}