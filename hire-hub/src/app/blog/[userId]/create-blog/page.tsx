"use client"

// Import necessary modules
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h3 className="text-3xl font-semibold">Create a New Blog</h3>
      <div className="flex gap-2 max-w-screen-md items-center">
        <Input
          size="sm"
          placeholder="Blog Topic"
          value={blogTopic}
          onChange={(e) => setBlogTopic(e.target.value)}
        />
        <Input
          size="sm"
          placeholder="Blog Text"
          value={blogText}
          onChange={(e) => setBlogText(e.target.value)}
        />
        <Button
          color="success"
          onClick={handlePostBlog}
          isLoading={loading}
        >
          {loading ? "Saving..." : "SAVE"}
        </Button>
      </div>
    </div>
  );
}


