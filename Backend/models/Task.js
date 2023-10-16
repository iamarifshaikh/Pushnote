import mongoose from "mongoose";

const Task = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Assigned"
  },
  deadline: {
    type: Date,
    required: true,
  },
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

export default mongoose.model("Task", Task);
