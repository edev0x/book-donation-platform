const Warehouse = require("../domain/models/Warehouse");

const { connectToDataSource } = require("../data/connection");

class WarehouseRepository {

  repositoryDataSource = null;
  repository = null;

  constructor() {
    this.initialize();
  }

  async create(warehouseInfo) {
    const createdWarehouse = this.repository.create(warehouseInfo);
    return await this.repository.save(createdWarehouse);
  }

  async findById(id) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.repository.find();
  }

  async update(warehouseInfo) {
    await this.repository.update(warehouseInfo.id, warehouseInfo);
    return await this.repository.findOne({ where: { id: warehouseInfo.id } });
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async initialize() {
    this.repositoryDataSource = await connectToDataSource();
    this.repository = this.repositoryDataSource.getRepository(Warehouse);
  }
}

module.exports = WarehouseRepository;
