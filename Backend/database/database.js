import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully Connected To MongoDB Server!");
  } catch (error) {
    console.error(error);
  }
};

export default connection;

// pushnote
// Z8VtrTGnbWNOryBO
