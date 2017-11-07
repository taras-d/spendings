export default class LoggerService {

    logUser(user) {
        this.logGroup(`[USER]`, user);
    }

    logApiRequest(options) {
        this.logGroup(`[API] ${options.method} ${options.relativeUrl}`, options.body || 'no request body');
    }

    logGroup(name, ...args) {
        console.groupCollapsed(name);
        args.forEach(a => console.log(a));
        console.groupEnd();
    }

}