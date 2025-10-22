import Mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await Mongoose.connect(
            process.env.DB_URI,
        );
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
