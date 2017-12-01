import moment from 'moment';

import validate from './validate';
import loadUser from './loadUser';
import unmountNotifier from './unmountNotifier';

const getMonthStartEnd = () => {
    return {
        start: moment().startOf('month'),
        end: moment().endOf('month')
    };
};

const paging = {
    getPage: (skip, limit) => skip / limit + 1,
    getSkip: (page, limit) => (page - 1) * limit
};

export default {
    validate,
    loadUser,
    unmountNotifier,
    getMonthStartEnd,
    paging
};