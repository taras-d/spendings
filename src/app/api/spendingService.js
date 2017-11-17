import moment from 'moment';

export default class SpendingService {

    constructor(apiService) {
        this.apiService = apiService;
    }

    createSpending(data) {
        return this.apiService.post('spending', data);
    }

    updateSpending(id, data) {
        return this.apiService.put(`spending/${id}`, data);
    }

    deleteSpending(id) {
        return this.apiService.delete(`spending/${id}`);
    }

    getSpendings(data) {
        return this.apiService.post(`spendings`, data).map(res => {
            res.data.forEach(spending => {
                spending.displayDate = moment(spending.date).format('DD MMMM YYYY');
            });
            return res;
        });
    }

}