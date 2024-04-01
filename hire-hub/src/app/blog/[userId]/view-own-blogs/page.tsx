"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import Link from 'next/link';

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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-12">
      <h1 className="text-5xl font-semibold mb-8">Blogs</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <ul>
          {blogs.map((blog, index) => (
            <li key={index} className="mb-8">
                <h2 className="text-2xl font-semibold">{blog.blogTopic}</h2>
                <p className="mt-2">{blog.blogText}</p>
               
                <p className="text-gray-500 mt-2">
                    Creation Date: {new Date(blog.createdAt).toLocaleDateString()} 
                </p>
                <p className="text-gray-500 mt-2">
                    Time: {new Date(blog.createdAt).toLocaleTimeString()}
                </p>
                <div style={{ marginBottom: '10px' }}>
                  <Link href={`/blog/comment/${userId}/${blog._id}/post-comment`}>
                    <Button color="primary">Post Comment</Button>
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href={`/blog/comment/${userId}/${blog._id}/view-comments`}>
                    <Button color="primary">Previous Comments</Button>
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}> 
                <Link href={`/blog/${userId}/${blog._id}/edit-blog`}>
                  <Button color="primary">Edit</Button>
                </Link>
                </div>
              <div style={{ marginBottom: '10px' }}>
                <Button color="primary" onClick={() => handleDelete(blog._id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}