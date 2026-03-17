import express from "express";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import tagRoutes from "./routes/tagRoutes.js"
import logger from "./middlewares/loggerMiddleware.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});