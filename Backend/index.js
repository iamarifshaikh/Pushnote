import express from "express";
import router from "./routes/routes.js";
import connection from "./database/database.js";

const app = express();
const port = process.env.PORT || 3000;

app.use("/", router);

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
