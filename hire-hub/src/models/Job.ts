import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  title: {
    required: [true, "Title is required. Please enter the title."],
    type: Schema.Types.String,
  },
  companyName: {
    required: [
      true,
      "Company name is required. Please enter the company name.",
    ],
    type: Schema.Types.String,
  },
  salary: {
    required: [true, "Salary is required. Please enter the salary."],
    type: Schema.Types.String,
  },
  location: {
    required: [true, "Location is required. Please enter the location."],
    type: Schema.Types.String,
  },
  description: {
    required: [true, "Description is required. Please enter the description."],
    type: Schema.Types.String,
  },
  postedBy: {
    type: Schema.Types.String,
  },
  applicants: [
    {
      fullName: String,
      mobileNumber: String,
      email: String,
      location: String,
      resumeLink: String,
      applicantUserId: String,
    },
  ],
});

export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
