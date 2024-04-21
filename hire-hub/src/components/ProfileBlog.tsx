
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";



export default function ProfileBlog({
  params,
}: {
  params: { id: string };
}) {

  const user = useSession();






  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blog/${params.id}/view-own-blogs`);
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

      <div className="p-4">
      <h1 className="text-black text-3xl font-bold mb-3">Blogs</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <ul>
          {blogs.map((blog, index) => (
              <li key={index} className="mb-8">
                <div style={{ marginBottom: '10px' }}>
                  <Link href={`/blog/comment/${params.id}/${blog._id}/view-comments`}>
                    <h2 className="text-2xl font-semibold" style={{ color: 'black' }}>{blog.blogTopic}</h2>
                  </Link>
                  <p className="text-black mt-2 font-semibold">Posted on {new Date(blog.createdAt).toLocaleDateString()}, {new Date(blog.createdAt).toLocaleTimeString()} </p>
                </div>
                <p className="mt-3 text-justify" style={{ color: 'black' }}>{blog.blogText}</p>
              </li>
          ))}
        </ul>
      )}

      </div>


  </>
);
}