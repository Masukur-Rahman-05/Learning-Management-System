import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
};