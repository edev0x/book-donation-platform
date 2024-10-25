require("reflect-metadata");
const config = require("./env").config;
const express = require("express");

const { DataSource } = require("typeorm");
const dataSourceConfig = require("./data/ormconfig").ormConfig;
const AppDataSource = new DataSource(dataSourceConfig);

const appRouter = require("./routes/routes");

class AppBootstrap {
  server = null;
  app = null;
  
  constructor() {
    this.app = express();
  }

  async start() {
    AppDataSource.initialize().then(() => {
      console.info("Database connection established successfully!");
    }).catch((error) => {
      console.error("Database connection failed!", error);
      process.exit(1);
    });

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    
    this.app.use(config.contextPath, appRouter);
    this.server = this.app.listen(config.port, () => {
      console.info(`Server started on port ${config.port}`);
    });
  }

  async stop() {
    this.server.close();
    console.info(`Server stopped successfully!`);
  }
}

module.exports = { AppBootstrap, AppDataSource };
