import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
const name = process.env.MERCHANT_NAME || "Sanajaya Rai";
const email =
  process.env.MERCHANT_EMAIL || "sanajaya.rai@electroshop.local";
const password = process.env.MERCHANT_PASSWORD;

if (!uri) throw new Error("MONGODB_URI is required.");
if (!password || password.length < 8) {
  throw new Error("MERCHANT_PASSWORD must be supplied and at least 8 characters.");
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ["customer", "merchant"], default: "customer" },
    phone: String,
    address: { street: String, city: String, province: String },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
const passwordHash = await bcrypt.hash(password, 12);
const user = await User.findOneAndUpdate(
  { email: email.toLowerCase() },
  {
    $set: {
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "merchant",
    },
    $setOnInsert: { phone: "", address: {} },
  },
  { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
);

console.log(`Merchant account ready: ${user.name} (${user.email})`);
await mongoose.disconnect();
