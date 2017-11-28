import { Observable } from 'rxjs/Observable';

export default class UserService {

    constructor(apiService, tokenService) {
        this.apiService = apiService;
        this.tokenService = tokenService;
    }

    createUser(data) {
        return this.apiService.post('users', data);
    }

    getUser() {
        return this.apiService.get('current-user');
    }

    updateUser(data) {
        return this.apiService.patch('current-user', data);
    }

    deleteUser(password) {
        return this.apiService.delete(`current-user?password=${password}`);
    }

    loginUser(data) {
        return this.apiService.post('authentication', data).do(res => {
            this.tokenService.setToken(res.accessToken);
        });
    }

    logoutUser() {
        this.tokenService.removeToken();
        return Observable.of(null);
    }

}