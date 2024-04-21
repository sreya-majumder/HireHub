"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import NavBlogs from "@/components/navbar/NavBlogs";
import extra from '../../../../style/extra.module.css';
import NavSigned from "@/components/NavSigned";

export default function Blogs({ params }: { params: { userId: string } }) {
  const { userId } = params;

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blog/${userId}/view-blogs`);
        setBlogs(response.data.blogs.reverse());
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (

  <>
  <title>Blogs</title>
  <div className="min-h-screen flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
    <div>
      <NavSigned />
      <div className="flex flex-col justify-center items-center">
        <h1 className="flex justify-center items-center text-4xl text-black font-semibold p-3">Blogs: Explore all blogs here</h1>
        <div>
          <button className={extra.complaint}><Link href={`/blog/${userId}/create-blog`}>Post a Blog</Link> </button>
          <button className={extra.complaint}><Link href={`/blog/${userId}/view-own-blogs`}>My Blogs</Link> </button>


        </div>
      </div>
      
    <div className="text-justify p-3 mr-3 ml-3">
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <ul>
          {blogs.map((blog, index) => (
              <li key={index} className="mb-8">
                <div className="bg-teal-100 border border-gray-300 rounded p-4 ml-3 mr-3 mt-3">
                <div className="bg-emerald-500 border border-black rounded p-1">
                <div style={{ marginBottom: '10px' }}>
                  <Link href={`/blog/comment/${userId}/${blog._id}/view-comments`}>
                    <h2 className="text-2xl font-semibold" style={{ color: 'black' }}>{blog.blogTopic}</h2>
                  </Link>
                </div> 
                <p className="text-black mt-2 font-semibold">Posted by {blog.userName} on {new Date(blog.createdAt).toLocaleDateString()},  {new Date(blog.createdAt).toLocaleTimeString()}</p>
                </div>
                <p className="mt-2" style={{ color: 'black' }}>{blog.blogText}</p>
                </div>
              </li>
          ))}
        </ul>
      )}
      </div>
      </div>
  </div>
  </>

  );
}
