import mongoose from "mongoose";

const EmployerSignUp = new mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    unique: true,
    required: true,
  },
  password: {
    type: "string",
    required: true,
    minlength: 8,
  },
});

export default mongoose.model("Employer", EmployerSignUp);
