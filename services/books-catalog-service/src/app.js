require("reflect-metadata");
const config = require("./env").config;
const express = require("express");

const appRouter = require("./routes/routes");

class AppBootstrap {

  constructor() {
    this.server = null;
    this.app = express();
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
  
  async stop() {
    this.server.close();
    console.info(`Server stopped successfully!`);
  }
}

module.exports = { AppBootstrap };
