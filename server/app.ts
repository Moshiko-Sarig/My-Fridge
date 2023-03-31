import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.routes";
import itemRoutes from "./src/routes/item.routes";
import itemCategoryRoutes from "./src/routes/itemCategory.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", [userRoutes, itemRoutes, itemCategoryRoutes]);

app.use("*", (req: Request, res: Response) => {
  res.status(404).send(`Route not found ${req.originalUrl}`);
});

const server = app.listen(process.env.APP_PORT, () => {
  console.log("Server is listening on port:", process.env.APP_PORT);
}).on("error", (err: NodeJS.ErrnoException) => {
  console.log(err);
  if (err.code === "EADDRINUSE") {
    console.log("Error: Address in use");
  } else {
    console.log("Error: Unknown error");
  }
});

export default server;
