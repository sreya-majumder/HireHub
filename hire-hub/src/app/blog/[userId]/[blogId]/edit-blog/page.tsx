"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import styles from "../../../../../style/post-blog.module.css"
import NavBlogs from "@/components/navbar/NavBlogs";
import NavSigned from "@/components/NavSigned";

export default function EditBlog({ params }: { params: { userId: string, blogId: string } }) {
  const router = useRouter();
  const { userId, blogId } = params;
  
  const [blogTopic, setBlogTopic] = useState("");
  const [blogText, setBlogText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/blog/${userId}/${blogId}/view-blog`);
        const { blogTopic, blogText } = response.data.blog;
        setBlogTopic(blogTopic);
        setBlogText(blogText);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [userId, blogId]);

  const handleUpdateBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/blog/${userId}/${blogId}/edit-blog`, {
        blogTopic,
        blogText,
      });
      if (response.status === 200) {
        router.push(`/blog/${userId}/view-own-blogs`);
      } else {
        console.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  

  return (


    <>
    <title>Post Blog</title>
    <div className="h-full flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
    <NavSigned />

    <div className={styles.form_container}>
      <form className={styles.form}>
        <div className={styles.form_group}>
          <label htmlFor="blogTopic">Edit Blog topic</label>
          <input  
          name="blogTopic" 
          id="blogTopic" 
          type="text" 
          value={blogTopic}
          onChange={(e) => setBlogTopic(e.target.value)}
          placeholder="Enter new blog topic"
          />
        </div>
        <div className={styles.form_group}>
          <label className="mt-20" htmlFor="textarea" >Edit Your Blog Here</label>
          <textarea  
          value={blogText}
          placeholder="Enter new blog text"
          onChange={(e) => setBlogText(e.target.value)} 
          id="textarea" 
          name="textarea"></textarea>
        </div>

        <Button
          className={styles.form_submit_btn}
          onClick={handleUpdateBlog}
          disabled={!blogTopic || !blogText || loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </Button>


      </form>
    </div>
    </div>

    {/* className={styles.form_submit_btn} */}
    </>

    // <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
    //   <h1 className="text-5xl font-semibold">Edit Blog</h1>
    //   <div className="flex flex-col gap-3 max-w-screen-sm py-4">
    //     <Input
    //       type="text"
    //       className="text-black"
    //       value={blogTopic}
    //       onChange={(e) => setBlogTopic(e.target.value)}
    //       placeholder="Enter new blog topic"
    //     />
    //     <textarea
    //       className="text-black"
    //       value={blogText}
    //       onChange={(e) => setBlogText(e.target.value)}
    //       placeholder="Enter new blog text"
    //     />
        // <Button
        //   color="success"
        //   onClick={handleUpdateBlog}
        //   disabled={!blogTopic || !blogText || loading}
        // >
        //   {loading ? "Updating..." : "Update Blog"}
        // </Button>
    //   </div>
    // </div>
  );
}
