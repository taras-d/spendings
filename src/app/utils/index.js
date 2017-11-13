import moment from 'moment';

import validate from './validate';
import loadUser from './loadUser';
import unmountNotifier from './unmountNotifier';

const getCurrMonthStartEndDates = () => {
    const now = new Date();
    return [
        moment().startOf('month'),
        moment().endOf('month')
    ];
}

export default {
    validate,
    loadUser,
    unmountNotifier,
    getCurrMonthStartEndDates
}