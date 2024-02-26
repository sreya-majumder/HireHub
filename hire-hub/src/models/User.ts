import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: [true, "Name is required. Please Enter your name"],
    minLength: [3, "Name must be 3 character long."],
    type: Schema.Types.String,
  },
  email: {
    required: [true, "Email is required.  Please Enter your email"],
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  country: {
      type: Schema.Types.String,
      required: true,
  },
  number: {
      type: Schema.Types.String,
      required: true,
  },
  age: {
      type: Schema.Types.String,
      required: true,
  },
  role: {
    required: true,
    type: Schema.Types.String,
    default: "User",
  },
  reset_password_token: {
    required: false,
    type: Schema.Types.String,
    trim: true,
  },
  
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
