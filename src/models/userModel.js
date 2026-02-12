import mongoose from "mongoose";

const options = {
  collection: "users",
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: {
      type: String,
      default: null,
    },
    isActive: { type: Boolean, default: true },
  },
  options
);

const userModel = mongoose.model("users", userSchema);
export { userModel };