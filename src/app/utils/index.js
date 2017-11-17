import moment from 'moment';

import validate from './validate';
import loadUser from './loadUser';
import unmountNotifier from './unmountNotifier';

const getMonthStartEnd = () => {
    return {
        start: moment().startOf('month'),
        end: moment().endOf('month')
    };
}

export default {
    validate,
    loadUser,
    unmountNotifier,
    getMonthStartEnd
}