import express from "express";
import router from "./routes/routes.js";
import connection from "./database/database.js";
import { config } from "dotenv";

const path = "../.env" // Change this variable if your .env path is different.
config({path: path});

const app = express();
app.use(express.json({ extended: true }));
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
