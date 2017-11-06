import { Observable } from 'rxjs/Observable';
import validate from 'validate.js';

import config from 'config';

export default class ApiService {

    defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        mapResponse: true,
        sendToken: true
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

        options = validate.extend({}, this.defaultOptions, options);
        options.url = `${config.apiUrl}/${options.url}`;

        if (options.sendToken) {
            const token = localStorage.getItem(config.tokenKey);
            if (token) {
                options.headers[config.tokenHeader] = token;
            }
        }

        const obs = Observable.ajax(options).do(
            res => res,
            err => {
                const xhr = err.xhr;
                err.reason = `${xhr.status} ${xhr.statusText}`;
            }
        );

        return options.mapResponse? obs.map(res => res.response): obs;
    }

}