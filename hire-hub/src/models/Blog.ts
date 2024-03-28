import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    blogTopic: {
        required: [true, "Topic is required. Please enter the topic name."],
        type: Schema.Types.String,
    },
    blogText: {
        required: [true, "Text is required. Please enter the blog text."],
        type: Schema.Types.String,
    },
    postedBy: {
        type: Schema.Types.String,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    comments: [
        {
            commentBy: String,
            commentText: String
        }
    ]
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
