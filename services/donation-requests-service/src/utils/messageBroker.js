const amqp = require("amqplib");
const config = require("../env").config;

class MessageBroker {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    console.info("Connecting to RabbitMQ...");

    setTimeout(async () => {
      try {
        this.connection = await amqp.connect(config.rabbitMqUri);
        this.channel = await this.connection.createChannel();

        await this.channel.assertQueue(config.rabbitQueue);

        console.info("Connected to RabbitMQ");
      } catch (err) {
        console.error(`Failed to connect to RabbitMQ:`, err);
      }
    }, 20_000);
  }

  async publishMessage(queue, message) {
    if (!this.channel) {
      console.error("No RabbitMQ channel available");
      return;
    }

    try {
      this.channel.sendToQueue(queue, Buffer.from(message));
    } catch (error) {
      console.error(`Failed to publish message to RabbitMQ:`, error);
    }
  }

  async consume(queue, callback) {
    if (!this.channel) {
      console.error("No RabbitMQ channel available");
      return;
    }

    try {
      await this.channel.consume(queue, (message) => {
        const content = message.content.toString();
        const parsedContent = JSON.parse(content);

        callback(parsedContent);
        this.channel.ack(message);
      });
    } catch (error) {
      console.error(`Failed to consume message from RabbitMQ:`, error);
    }
  }
}

module.exports = { MessageBroker };