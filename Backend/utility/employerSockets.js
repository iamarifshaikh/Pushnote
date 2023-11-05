import { io } from "../index.js";

const employerSockets = {};

// Function to store the employer's socket
export const storeEmployerSocket = async (employerId, socket) => {
  employerSockets[employerId] = socket;
};

// Function to retrieve the employer's socket
export const getEmployerSocket = (employerId) => {
  return employerSockets[employerId];
};

// Your existing code for Socket.IO
io.on("connection", (socket) => {
  console.log("websocket connection established!");

  socket.on("identifyEmployer", (employerId) => {
    // Store the employer's socket upon connection
    storeEmployerSocket(employerId, socket);
  });

  socket.on("disconnect", () => {
    // Remove the employer's socket upon disconnection
    const employerId = Object.keys(employerSockets).find(
      (id) => employerSockets[id] === socket
    );
    if (employerId) {
      delete employerSockets[employerId];
    }
    console.log("A user disconnected");
  });
});
