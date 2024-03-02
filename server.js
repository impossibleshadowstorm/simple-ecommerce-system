require("dotenv").config();
require("express-async-errors");
const express = require("express");
// Security Related Imports
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// DB related Imports
const connectDB = require("./db/connect");

// Middleware Imports
const authenticatedUser = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Route Imports
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => console.log("Db Connected"))
      .catch((error) => {
        console.log(`Db Connection Error: ${error}`);
      });

    app.set("trust proxy", 1);
    app.use(
      rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // each IP can 100 requests per 15 minutes
      })
    );
    app.use(helmet());
    app.use(cors());
    app.use(xss());
    app.use(express.json());

    app.use("/api/auth", authRouter);
    app.use("/api/users", authenticatedUser, usersRouter);
    app.use("/api/books", authenticatedUser, booksRouter);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
