# Backend System Design for Gurucool

This is a backend system for the Gurucool application, designed with Node.js, Express, MongoDB, and RabbitMQ. The system includes user authentication, a request queue, and metrics collection.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v18.16.1 or later)
- MongoDB
- RabbitMQ

### Steps

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd backend-system-design
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up RabbitMQ:
    - [Download and install RabbitMQ](https://www.rabbitmq.com/download.html)
    - Ensure RabbitMQ is running:
        ```bash
        rabbitmq-server
        ```

4. Configure environment variables:
    - Create a `.env` file in the root directory with the following content:
        ```plaintext
        PORT=5000
        MONGODB_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret>
        RABBITMQ_URL=amqp://localhost
        ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```

2. The server will start on port 5000 by default.

## Endpoints

### Authentication

- **Register**
    - URL: `/auth/register`
    - Method: `POST`
    - Body:
        ```json
        {
            "username": "user@example.com",
            "password": "password"
        }
        ```
    - Response: `JWT token`

- **Login**
    - URL: `/auth/login`
    - Method: `POST`
    - Body:
        ```json
        {
            "username": "user@example.com",
            "password": "password"
        }
        ```
    - Response: `JWT token`

### Request Queue

- **Enqueue Request**
    - URL: `/api/request`
    - Method: `POST`
    - Headers:
        ```plaintext
        Authorization: Bearer <your_jwt_token>
        Content-Type: application/json
        ```
    - Body:
        ```json
        {
            "request": {
                "status": "pending"
            }
        }
        ```
    - Response: `Request enqueued`

### Metrics

- **Get Metrics**
    - URL: `/metrics`
    - Method: `GET`
    - Response: Prometheus metrics

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

- `PORT`: Port on which the server will run (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `RABBITMQ_URL`: RabbitMQ connection URL (default: `amqp://localhost`)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
