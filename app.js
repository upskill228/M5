
import dotenv from "dotenv";
import { db } from "./db.js";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import tagRoutes from "./routes/tagRoutes.js"
import logger from "./middlewares/loggerMiddleware.js";

dotenv.config();

db.query("SELECT 1")
  .then(() => console.log("DB OK"))
  .catch(err => console.error("DB error:", err));

const app = express();

app.use(express.json());
app.use(logger);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});