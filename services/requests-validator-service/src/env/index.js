require("dotenv").config();

const config = {
  consumerQueue: process.env.PROCESSED_REQUESTS_QUEUE || undefined,
  publishQueue: process.env.DONATION_REQUESTS_QUEUE || undefined,
  rabbitMqUri: process.env.RABBITMQ_URI || "amqp://localhost",
  port: process.env.PORT || 3005,
  contextPath: process.env.CONTEXT_PATH || "/api/v1/donations",
  db: {
    database: process.env.DATABASE_NAME || null,
    username: process.env.DATABASE_USERNAME || null,
    password: process.env.DATABASE_PASSWORD || null,
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || 5432,
    ssl: process.env.DATABASE_SSL === "true",
    clientMinMessages: process.env.DATABASE_CLIENT_MIN_MESSAGES || "notice",
    pool: {
      max: process.env.DATABASE_POOL_MAX || 5,
      min: process.env.DATABASE_POOL_MIN || 0,
      acquire: process.env.DATABASE_POOL_ACQUIRE || 30000,
      idle: process.env.DATABASE_POOL_IDLE || 10000,
    },
    url: process.env.DATABASE_URL || null,
    dialect: process.env.DATABASE_DIALECT || "postgres",
    schema: process.env.DATABASE_SCHEMA || "public",
    logging: process.env.DATABASE_LOGGING === "true",
    synchorize: process.env.DATABASE_SYNCHRONIZE === "true",
  },
  mqOptions: {
    durable: process.env.MQ_DURABLE === "true",
    persistent: process.env.MQ_PERSISTENT === "true",
    autoDelete: process.env.MQ_AUTO_DELETE === "false",
    arguments: {
      "x-message-ttl": process.env.MQ_MESSAGE_TTL || 30000,
      "x-max-length": process.env.MQ_MAX_LENGTH || 20_000,
    }
  }
};

module.exports = { config };
