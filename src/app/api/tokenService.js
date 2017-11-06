import config from '../config';

export default class TokenService {

    key = config.tokenKey;

    getToken() {
        return localStorage.getItem(this.key);
    }

    setToken(token) {
        return localStorage.setItem(this.key, token);
    }

    removeToken() {
        localStorage.removeItem(this.key);
    }

}