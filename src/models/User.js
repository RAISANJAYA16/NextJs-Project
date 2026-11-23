import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    province: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["customer", "merchant"],
      default: "customer",
      index: true,
    },
    phone: { type: String, trim: true, default: "" },
    address: { type: addressSchema, default: () => ({}) },
  },
  { timestamps: true },
);

// Next.js keeps Mongoose models in memory during development. Replace an old
// cached model after schema changes so the merchant role is available without
// silently returning users with an incomplete shape.
if (mongoose.models.User && !mongoose.models.User.schema.path("role")) {
  delete mongoose.models.User;
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
