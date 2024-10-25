# Book Donation Platform

Welcome to the Book Donation Platform project! This README provides an overview of the project structure and explains the purpose of each component.

## Project structure

```sh
book-donation-platform/
├── services/
├── database/
├── docker-compose.yml
└── README.md
```

## Getting Started

To get started with the project, clone the repository and follow the setup instructions in the `docs/` directory.

Below is more information about how this project is structured.

### `services/`

This folder contains the microservices that power the Book Donation Platform. Each microservice is built using Express.js, a fast and minimalist web framework for Node.js. These microservices handle various functionalities such as user authentication, book inventory management, and donation processing.

- `auth-service/`: Manages user authentication and authorization.
- `inventory-service/`: Handles book inventory operations including adding, updating, and deleting books.
- `donation-service/`: Manages the donation process, tracking donations and donor information.

Each service is self-contained and follows a microservices architecture to ensure scalability and maintainability.

## Contributing

We welcome contributions! Please see the guidelines in the `docs/` directory for more information on how to contribute to the project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

Thank you for using the Book Donation Platform!
