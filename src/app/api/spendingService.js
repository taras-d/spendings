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
        return this.apiService.post(`spendings`, data);
    }

}