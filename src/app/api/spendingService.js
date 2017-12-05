import moment from 'moment';
import numeral from 'numeral';
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
            res.displayTotalSum = this._formatMoney(res.totalSum);
            res.data.forEach(spending => {
                spending.date = new Date(spending.date);
                spending.displayDate = this._formatDate(spending.date);
                spending.displaySum = this._formatMoney(spending.sum);
                spending.items.forEach(item => item.displayCost = this._formatMoney(item.cost));
            });
            return res;
        });
    }

    autocompleteSpendingItem(search) {
        return this.apiService.get(`spending-item-autocomplete?search=${search}`);
    }

    _formatDate(date) {
        return moment(date).format('DD MMMM YYYY');
    }

    _formatMoney(money) {
        return numeral(money).format('0,0.00');
    }

}