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

    constructor(tokenService, loggerService) {
        this.tokenService = tokenService;
        this.loggerService = loggerService;
    }

    get(url, options) {
        return this.request({ url, method: 'GET' });
    }

    post(url, body, options) {
        return this.request({ url, method: 'POST', body });
    }

    put(url, body, options) {
        return this.request({ url, method: 'PUT', body });
    }

    delete(url, body, options) {
        return this.request({ url, method: 'DELETE', body });
    }

    request(options) {

        options = validate.extend({}, this.defaultOptions, options);
        options.relativeUrl = options.url;
        options.url = `${config.apiUrl}/${options.url}`;

        if (options.sendToken) {
            const token = this.tokenService.getToken();
            if (token) {
                options.headers[config.tokenHeader] = token;
            }
        }

        this.loggerService.logApiRequest(options);

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

            if (xhr.status === 401) {
                window.location.href = '/#/login';
            }

            return Observable.throw({ reason });
        });

        return options.mapResponse? obs.map(res => res.response): obs;
    }

}