import { Subject } from 'rxjs/Subject';

class UnmountNotifier extends Subject {

    notify() {
        this.next(true);
        this.complete();
    }

}

export default () => new UnmountNotifier();