import mongoose from "mongoose";

const Employer = new mongoose.Schema({
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
  workSpaceName: {
    type: "string",
    required: true,
  },
  workSpaceCode: {
    type: "string",
    required: false,
  },
});

export default mongoose.model("Employer", Employer);
