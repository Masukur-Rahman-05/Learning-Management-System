

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://masukrahoman5:masukrahoman6@lmscluster.vuxmp.mongodb.net/LMS"
    );
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
};