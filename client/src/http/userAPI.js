import {$authHost, $host} from './index'
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const response = await $host.post('api/user/registration', {email, password, role: 'USER'})
    return jwt_decode(response.data.token)
}

export const login = async (username, password) => {
    const response = await $host.post('api/user/login', {username, password})
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}

export const check = async () => {
    const response = await $authHost.get('api/user/check')
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}