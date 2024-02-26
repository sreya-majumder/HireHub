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
  },
  country: {
    type: Schema.Types.String,
  },
  number: {
    type: Schema.Types.String,
  },
  age: {
    type: Schema.Types.String,
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
  job: {
    type: [
      {
        role: String,
        company: String,
        description: String,
      },
    ],
    required: false,
  },
  projects: {
    type: [
      {
        name: String,
        about: String,
      },
    ],
    required: false,
  },
  skills: {
    type: [{ name: String }],
    required: false,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
