# E-Commerce System

Welcome to the E-Commerce System! This system is built to provide a seamless shopping experience for users while ensuring security and reliability. Below you'll find information on how to set up and use the system.

## Features

- Frontend built with Next.js for improved performance and SEO.
- State management using Redux Toolkit for predictable state management.
- Thunk middleware for asynchronous logic in Redux.
- Redux Persist for persisting Redux state in local storage.
- Backend powered by Express for robust server-side logic.
- CORS enabled for secure communication between frontend and backend.
- XSS protection implemented to prevent cross-site scripting attacks.
- Rate limiting to mitigate brute force and denial of service attacks.
- MongoDB used as the database for efficient data storage and retrieval.
- JWT authentication system ensures secure user authentication and authorization.

## Installation

# Running with Docker

1. Make sure you have Docker and Docker Compose installed on your machine.

2. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
3. Build the Docker images:
   ```bash
   docker-compose build
   ```
4. Start the Docker containers:
   ```bash
   docker-compose up
   ```

# Running Backend and Frontend Separately

## Backend (Node.js)

1. Navigate to the backend directory:
2. Add .env file with PORT, JWT_LIFETIME, MONGO_URI, JWT_SECRET
3. Install dependencies:
   ```bash
   npm i
   npm run dev
   ```

## Frontend (Node.js)

1. Navigate to the frontend directory:
2. Add .env file
3. Install dependencies:
   ```bash
   yarn
   yarn dev
   ```
