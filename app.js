import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { db } from "./db.js";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";

import logger from "./middlewares/loggerMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { checkDBConnection } from "./utils/checkDBConnection.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(logger);

// Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);

// Error handler - global (in the end, always)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Function start server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // change to "running on port" for production
  });
};

// Initialization: checks DB connection before starting server
const init = async () => {
  await checkDBConnection(db);
  startServer();
};

init();

export default app;