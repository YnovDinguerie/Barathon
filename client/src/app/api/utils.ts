import axios from 'axios'
import config from './config'

export const apiFetch = (method: string, path: string, data: object = {}) => {
    let headers = {}
    if (localStorage.user) {
        headers = {
            Authorization: `Bearer ${JSON.parse(localStorage.user).token}`,
        }
    } else {
        headers = {}
    }
    return axios({
        method: method,
        url: config.backendApiUrl + path,
        data: data,
        headers: headers,
    })
}
