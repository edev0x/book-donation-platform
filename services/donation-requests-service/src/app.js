require("reflect-metadata");
const config = require("./env").config;
const express = require("express");

const messageBroker = require("./utils/messageBroker");
const appRouter = require("./routes/routes");

const { appDataSource } = require("./data/connection");

class AppBootstrap {

  constructor() {
    this.server = null;
    this.app = express();

    // Initialize broker connection
    this.setUpMessageBroker();
  }

  async start() {
    try {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));

      this.app.use(config.contextPath, appRouter);
      this.server = this.app.listen(config.port, () => {
        console.info(`Server started on port ${config.port}`);
      });

    } catch (error) {
      console.error("Database connection failed!", error);
      process.exit(1);
    }
  }

  setUpMessageBroker() {
    messageBroker.connect();
  }

  async stop() {
    this.server.close();
    console.info(`Server stopped successfully!`);
  }
}

module.exports = { AppBootstrap };
