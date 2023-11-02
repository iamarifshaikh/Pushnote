import mongoose from "mongoose";

const Employer = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  workSpaceName: {
    type: String,
    required: true,
  },
  workSpaceCode: {
    type: String,
    required: false,
    unique: true,
  },
  // employerCode: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  employees: [
    {
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      firstName: String,
      lastName: String,
      email: String,
    },
  ],
});

export default mongoose.model("Employer", Employer);
