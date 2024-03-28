import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    return console.log("DataBase connect successfully");
  } catch (e) {
    return console.log("DataBase error: ", e.message);
  }
};
