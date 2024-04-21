"use client"

// Import necessary modules
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBlogs from "@/components/navbar/NavBlogs";
import styles from "../../../../style/post-blog.module.css"
import NavSigned from "@/components/NavSigned";
export default function CreateBlog({ params }: { params: { userId: string } }) {
  const { userId } = params;

  
  const [blogTopic, setBlogTopic] = useState("");
  const [blogText, setBlogText] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handlePostBlog() {
    try {
      setLoading(true);


      const response = await axios.post(`/api/blog/${userId}/create-blog`, {
        blogTopic,
        blogText,
      });

      if (response.status === 200) {
        router.push(`/blog/${userId}/view-blogs`);
      } else {
        console.error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <title>Post Blog</title>
    <div className="h-full flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
    <NavSigned />

    <div className={styles.form_container}>
      <form className={styles.form}>
        <div className={styles.form_group}>
          <label htmlFor="email">Blog topic</label>
          <input  
          name="email" 
          id="email" 
          type="text" 
          value={blogTopic}
          onChange={(e) => setBlogTopic(e.target.value)}/>
        </div>
        <div className={styles.form_group}>
          <label className="mt-20" htmlFor="textarea" >Write Your Blog Here</label>
          <textarea  
          value={blogText}
          onChange={(e) => setBlogText(e.target.value)} 
          id="textarea" 
          name="textarea"></textarea>
        </div>
        <Button type="submit" className={styles.form_submit_btn} onClick={handlePostBlog}
        isLoading={loading}>Post</Button>
      </form>
    </div>
    </div>
    </>
  );
}


