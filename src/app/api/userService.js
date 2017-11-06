import { Observable } from 'rxjs/Observable';

export default class UserService {

    constructor(apiService, tokenService) {
        this.apiService = apiService;
        this.tokenService = tokenService;
    }

    createUser(data) {
        return this.apiService.post('user', data);
    }

    getUser() {
        return this.apiService.get('user');
    }

    updateUser(data) {
        return this.apiService.put('user', data);
    }

    deleteUser(password) {
        return this.apiService.delete('user', { password });
    }

    loginUser(data) {
        return this.apiService.post('user/login', data).do(res => {
            this.tokenService.setToken(res.token);
        });
    }

    logoutUser() {
        this.tokenService.removeToken();
        return Observable.of(null);
    }

}