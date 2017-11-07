import { Observable } from 'rxjs/Observable';

import api from 'api';
import store from 'store';

const loadUser = () => {
    if (api.tokenService.hasToken()) {
        return api.userService.getUser()
            .catch(() => Observable.of(null));
    } else {
        return Observable.of(null);
    }
}

export default loadUser;