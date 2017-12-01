const prod = process.env.NODE_ENV === 'production';

export default class LoggerService {

    logUser(user) {
        this.logGroup(`[USER]`, user);
    }

    logApiRequest(options) {
        this.logGroup(`[API] ${options.method} ${options.relativeUrl}`, options.body || 'no request body');
    }

    logGroup(name, ...args) {
        if (prod) {
            return;
        }

        console.groupCollapsed(name);
        args.forEach(a => console.log(a));
        console.groupEnd();
    }

}