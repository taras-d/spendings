import { Observable } from 'rxjs/Observable';
import validate from 'validate.js';

export default class ApiSerice {

    defaultOptions = {
        headers: {
            'ContentType': 'application/json'
        }
    };

    get(url, options) {
        return this.request({ url, method: 'GET' });
    }

    post(url, body, options) {
        return this.request({ url, method: 'POST', body });
    }

    put(url, body, options) {
        return this.request({ url, method: 'PUT', body });
    }

    delete(url, data, options) {
        return this.request({ url, method: 'DELETE', body });
    }

    request(options) {
        return Observable.ajax(
            validate.extend({}, this.defaultOptions, options)
        );
    }

}