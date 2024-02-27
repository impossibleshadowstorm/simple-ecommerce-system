# Sample E-commerce Application

This is a sample e-commerce application built with [React](https://reactjs.org/) for the frontend and [Node.js](https://nodejs.org/) for the backend.

## Installation

### Running with Docker

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
