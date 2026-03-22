
import dotenv from "dotenv";
import { db } from "./db.js";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import tagRoutes from "./routes/tagRoutes.js"
import logger from "./middlewares/loggerMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(logger);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);

const PORT = process.env.PORT || 3000;

const checkDBConnection = async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ DB OK");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

const init = async () => {
  await checkDBConnection();
  startServer();
};

init();