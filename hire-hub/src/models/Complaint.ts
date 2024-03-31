import mongoose, { Schema } from "mongoose";

const complaintSchema = new Schema({
    content: {
        required: [true, "Text is required. Please enter the complaint."],
        type: Schema.Types.String,
    },
    postedBy: {
        type: Schema.Types.String,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
});

export const Complaint = mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);