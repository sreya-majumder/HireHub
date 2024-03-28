"use client"

import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddComment({ params }: { params: { commentBy: string, blogId: string } }) {
  
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

 
  const { commentBy, blogId } = params;


  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/blog/comment/${commentBy}/${blogId}/post-comment`, {
        commentText,
      });

      // Redirect to the blog page after successfully adding the comment
      router.push(`/blog/${commentBy}/view-blogs`);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Render the component
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-5xl font-semibold">Add Comment</h1>
      <div className="flex flex-col gap-3 max-w-screen-sm py-4">
        <Input
          type="text"
          value={commentText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
          placeholder="Enter your comment"
        />
        <Button onClick={handleSubmit} isLoading={loading} disabled={!commentText}>
          {loading ? "Adding Comment..." : "Add Comment"}
        </Button>
      </div>
    </div>
  );
}
