"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
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


    <div className="h-full flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
      <div>
      <NavSigned />
      <h1 className="flex justify-center items-center text-4xl text-black font-semibold p-3">Blogs: Explore all blogs here</h1>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <ul>
          {blogs.map((blog, index) => (
            <li key={index} className="mb-8">
               <div style={{ marginBottom: '10px' }}>
                  <Link href={`/blog/comment/${userId}/${blog._id}/view-comments`}>
                    <h2 className="text-2xl font-semibold" style={{ color: 'black' }}>{blog.blogTopic}</h2>
                  </Link>
                </div> 
               
                {/* <p className="mt-2" style={{ color: 'black' }}>{blog.blogText}</p>
                <p className="text-gray-500 mt-2">
                    Posted by: {blog.userName}
                </p>
                <p className="text-black mt-2">
                    Creation Date: {new Date(blog.createdAt).toLocaleDateString()} 
                </p>
                <p className="text-black mt-2">
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
                </div>  */}
                
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>




    // <div className="container mx-auto px-4 py-8">
    //     <h1 className="text-4xl font-bold mb-8 text-center">All Blogs</h1>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

    //         <div className="bg-white p-6 rounded-lg shadow-md">
    //             <h2 className="text-xl font-bold mb-2">Blog Title</h2>
    //             <p className="text-gray-700 mb-4"></p>
    //             <a href="#" className="text-blue-600 hover:underline">Read more</a>
    //         </div>
    //     </div>
    // </div>


  );
}
