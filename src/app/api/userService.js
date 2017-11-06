export default class UserService {

    constructor(api) {
        this.api = api;
    }

    createUser(data) {
        return this.api.post('/user', data);
    }

    loginUser(data) {
        return this.api.post('/user/login', data);
    }

    getUser() {
        return this.api.get('/user');
    }

    updateUser(data) {
        return this.api.put('/user', data);
    }

    deleteUser(password) {
        return this.api.delete('/user', { password });
    }

}