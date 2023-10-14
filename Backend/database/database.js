import mongoose from 'mongoose';

const connection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/pushnote", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully Connected To MongoDB Server!");
    } catch (error) {
        console.error(error);
    };
};

export default connection;