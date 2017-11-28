import moment from 'moment';
import queryString from 'query-string';

export default class SpendingService {

    constructor(apiService) {
        this.apiService = apiService;
    }

    createSpending(data) {
        return this.apiService.post('spendings', data);
    }

    updateSpending(id, data) {
        return this.apiService.patch(`spendings/${id}`, data);
    }

    deleteSpending(id) {
        return this.apiService.delete(`spendings/${id}`);
    }

    getSpendings(data) {
        const params = { $limit: data.limit, $skip: data.skip };

        const period = data.period;
        if (period) {
            if (period.start) {
                params['date[$gte]'] = period.start.toISOString();
            }
            if (period.end) {
                params['date[$lte]'] = period.end.toISOString();
            }
        }

        const url = 'spendings?' + queryString.stringify(params, { encode: false });

        return this.apiService.get(url).map(res => {
            res.data.forEach(spending => {
                spending.date = new Date(spending.date);
                spending.displayDate = moment(spending.date).format('DD MMMM YYYY');
            });
            return res;
        });
    }

}