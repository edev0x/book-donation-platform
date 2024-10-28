const WarehouseRepository = require("../repositories/warehouseRepository");

class WareHouseService {
    constructor() {
        this.repository = new WarehouseRepository();
    }

    async checkBookSamplesAvailability(book) {
        const warehouse = await this.repository.findById(book.id);
        return warehouse.samples > 0;
    };
}

module.exports = WareHouseService;