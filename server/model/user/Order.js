import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userEmail: String,
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  orderDate: Date,
  paymentId: String,
  payerId: String,
  courseImage: String,
  courseTitle: String,
  courseId: String,
  coursePricing: String,
});

export const Order = mongoose.model("Order", OrderSchema);
