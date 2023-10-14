import express from "express";
import router from "./routes/routes.js";
import connection from "./database/database.js";
import { config } from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ extended: true }));
app.use("/api", router);

config();

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
