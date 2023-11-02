import express from "express";
import router from "./routes/routes.js";
import connection from "./database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

// const path = "./index.js"; // Change this variable if your .env path is different.
config();

const app = express();
app.use(express.json({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/api", router);
const port = process.env.PORT || 3000;

connection()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
      });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => {
    console.log("Invalid Database connection");
  });
