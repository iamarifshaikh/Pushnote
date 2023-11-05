import express from "express";
import http from "http";
import { Server } from "socket.io";
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

app.get("/", (request, response) => {
  response.send(
    "<h1>Pushnote</h1> <br/> <p>Pushnote: The ultimate digital bulletin board for seamless workplace communication and task management between employee and employer.<br/>It is a backend of a Pushnote, all the magic happens here !</p>"
  );
});

// Create an HTTP server and attach it to the Express app
const server = http.createServer(app);

// Create an instance of the Socket.IO server and attach it to the HTTP server
export const io = new Server(server);

const port = process.env.PORT || 3000;

connection()
  .then(() => {
    try {
      server.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
      });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => {
    console.error("Invalid Database connection");
  });
