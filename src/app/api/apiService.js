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

        const obs = Observable.ajax(options).catch(ajaxError => {

            const { response, xhr } = ajaxError;
            
            let reason;
            if (response && response.error) {
                reason = response.error;
            } else if (xhr.status) {
                reason = `${xhr.status} ${xhr.statusText}`;
            } else {
                reason = 'Internal server error';
            }

            return Observable.throw({ reason });
        });

        return options.mapResponse? obs.map(res => res.response): obs;
    }

}