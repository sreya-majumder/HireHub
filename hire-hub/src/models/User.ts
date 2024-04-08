import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: [true, "Name is required. Please Enter your name"],
    minLength: [3, "Name must be 3 character long."],
    type: Schema.Types.String,
  },
  email: {
    required: [true, "Email is required.Please Enter your email"],
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
    default: "Applicant",
  },
  isVerified: {
    required: true,
    type: Schema.Types.Boolean,
    default: false,
  },
  verificationCode: {
    type: Schema.Types.String,
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

  recommendations: {
    type: [
      {
        recommendation: String,
        recruiterName: String,
      },
    ],
    required: false,
  },
  recruiterReview: {
    type: [
      {
        name : String,
        review : String,
      },
    ],
    required: false,
  },

  ratings: {
    type: [
      {
        jobID: Schema.Types.ObjectId,
        rating: Number,
      },
    ],
    required: false,
  },
  disabled: {
    type: Schema.Types.Boolean,
  }
});



export const User = mongoose.models.User || mongoose.model("User", userSchema);
