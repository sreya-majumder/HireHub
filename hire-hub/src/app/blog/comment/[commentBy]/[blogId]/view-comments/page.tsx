"use client"

import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogComments({ params }: { params: { commentBy: string, blogId: string } }) {
  const { commentBy, blogId } = params;

  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blog/comment/${commentBy}/${blogId}/view-comments`);
        setComments(response.data.comments.reverse());
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-12">
      <h1 className="text-5xl font-semibold mb-8">Blog Comments</h1>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="mb-8">
                <p>{comment.commentText}</p>
                <p>Comment by: {comment.userName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
