"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import NavSigned from "@/components/NavSigned";

export default function BlogComments({ params }: { params: { commentBy: string, blogId: string } }) {
  const { commentBy, blogId } = params;

  const [loading, setLoading] = useState(false);
  const [blogText, setBlogText] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [postedBy, setPostedBy] = useState("")
  const [blogTopic, setBlogTopic] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchBlogAndComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blog/comment/${commentBy}/${blogId}/view-comments`);
        const { blogText, comments } = response.data;
        setBlogTopic(blogTopic);
        setBlogText(blogText);
        setComments(comments.reverse());
        setPostedBy(postedBy)
      } catch (error) {
        console.error("Error fetching blog and comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogAndComments();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/blog/comment/${commentBy}/${blogId}/post-comment`, {
        commentText,
      });

      // Redirect to the blog page after successfully adding the comment
      // router.push(`/blog/${commentBy}/view-blogs`);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log('hh'+postedBy)

  return (
    <div className="h-screen flex flex-col gap-2  bg-slate-800 text-transparent">
    <NavSigned />
    <div className="text-white p-3 ">


      <h1 className="text-5xl font-semibold mb-8">Blog Topic</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <div className=" w-full bg-transparent rounded-lg shadow-md overflow-y-auto p-6 mb-8">

            <p>{blogText}</p>
          </div>

          <div className="mb-8">
          <hr className="border border-white border-t-1 border-b-1 border-r-0 border-l-0"/>
            <h2 className="text-2xl font-semibold mt-2 mb-2">Comments</h2>
            <hr className="border border-white border-t-1 border-b-1 border-r-0 border-l-0"/>
            <ul>
              {comments.map((comment, index) => (
                <div className="w-full bg-transparent rounded-lg shadow-md overflow-y-auto p-6">
                <li key={index} className="mb-8">
                  <p>{comment.userName}: {comment.commentText}</p>
                  <p></p>
                  
                </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex flex-row">
          <Input
          type="text"
          value={commentText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
          placeholder="Enter your comment"
        />

          <Button onClick={handleSubmit} isLoading={loading} disabled={!commentText}>
          {loading ? "Adding Comment..." : "Add Comment"}
        </Button></div>


          {/* <div style={{ marginBottom: '10px' }}>
                  <Link href={`/blog/comment/${commentBy}/${blogId}/post-comment`}>
                    <Button color="primary">Post Comment</Button>
                  </Link>
                </div> */}
        </>
      )}


{/* <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
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
    </div> */}
    </div>

    </div>

    
  );
}
