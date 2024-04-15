"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import Link from 'next/link';


export default function BlogComments({ params }: { params: { commentBy: string, blogId: string } }) {
  const { commentBy, blogId } = params;

  const [loading, setLoading] = useState(false);
  const [blogText, setBlogText] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blog/comment/${commentBy}/${blogId}/view-comments`);
        const { blogText, comments } = response.data;
        setBlogText(blogText);
        setComments(comments.reverse());
      } catch (error) {
        console.error("Error fetching blog and comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogAndComments();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-12">
      <h1 className="text-5xl font-semibold mb-8">Blog Details</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Blog Text:</h2>
            <p>{blogText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Comments:</h2>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="mb-8">
                  <p>{comment.commentText}</p>
                  <p>Comment by: {comment.userName}</p>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '10px' }}>
                  <Link href={`/blog/comment/${commentBy}/${blogId}/post-comment`}>
                    <Button color="primary">Post Comment</Button>
                  </Link>
                </div>
        </>
      )}
    </div>
  );
}
