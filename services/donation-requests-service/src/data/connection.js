const { DataSource } = require("typeorm");
const dataSourceConfig = require("./ormconfig").ormConfig;

const connectToDataSource = async () => {
  const AppDataSource = new DataSource(dataSourceConfig);

  try {
    await AppDataSource.initialize();
    console.info("Connected to datasource");
    return AppDataSource;
  } catch (error) {
    console.error("Error during datasource initialization", error);
    process.exit(1);
  }
};

module.exports = { connectToDataSource };