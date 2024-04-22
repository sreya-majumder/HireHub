"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Nav from "@/components/Nav";
import NavSigned from "@/components/NavSigned";
import Bot from "@/components/bot";

export default function Blogs({ params }: { params: { userId: string } }) {
  const { userId } = params;

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blog/${userId}/view-own-blogs`);
        setBlogs(response.data.blogs.reverse());
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  
  const handleDelete = async (blogId: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/blog/${userId}/${blogId}/delete-blog`);
      if (response.status === 200) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <title>My Blogs</title>
    <NavSigned />
    <div className="min-h-screen flex flex-col gap-2 bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
      
      <h1 className="text-5xl font-semibold ">Blogs</h1>

      
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <ul>
          {blogs.map((blog, index) => (
            <li key={index} className="mb-8">
              <div className="border border-gray-300 rounded p-4 ml-3 mr-3 mt-3">
                <h2 className="text-2xl font-semibold text-black"><Link href={`/blog/comment/${userId}/${blog._id}/view-comments`}>{blog.blogTopic}</Link></h2>
                <p className="text-black mt-2 font-semibold">Posted on {new Date(blog.createdAt).toLocaleDateString()},  {new Date(blog.createdAt).toLocaleTimeString()}</p>
                <p className="mt-2 text-justify text-xl text-black">{blog.blogText}</p>
                

                <div className="flex flex-row mt-3"> 
                <Link href={`/blog/${userId}/${blog._id}/edit-blog`}>
                  <Button color="primary">Edit</Button>
                </Link>

                <Button className="ml-2" color="primary" onClick={() => handleDelete(blog._id)}>Delete</Button>
                </div>
                </div>
            </li>
          ))}
        </ul>
        
      )}
      
      <Bot />
    </div>

    </>

  );
}
