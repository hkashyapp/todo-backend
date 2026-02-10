import mongoose from "mongoose";

const options = {
  collection: "users",
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: {
    createdAt: "createdDate",
    updatedAt: "updatedDate",
  },
};

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isActive: { type: Boolean, default: true },
  },
  options
);

const userModel = mongoose.model("users", userSchema);
export { userModel };