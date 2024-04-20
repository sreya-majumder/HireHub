"use client"

// Import necessary modules
import React, { useState } from "react";
import {Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from '../../../../style/feedback.module.css';
import NavBlogs from "@/components/navbar/NavBlogs";
import extra from '../../../../style/extra.module.css';
import Link from "next/link";


export default function AddComplaint({ params }: { params: { userId: string } }) {
  const { userId } = params;

  
  
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handlePostComplaint() {
    try {
      setLoading(true);


      const response = await axios.post(`/api/complaint/${userId}/add-complaint`, {
        content,
      });

      if (response.status === 200) {
        router.push(`/complaint/${userId}/view-my-complaints`);
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  }
  console.log(userId)
  return (
    <>
    <title>Submit Feedback</title>
    <div className="h-screen flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
      <NavBlogs />
      <div className={styles.card}>
        <div className={styles.card2}>
          <form className={styles.form}>
            <p id="heading">Submit Feedback</p>
              <div className={styles.field}>

                <input
                type="text"
                className={styles.input_field}
                placeholder="Write Feedback"

                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className={styles.btn}>
                <Button 
                className={extra.complaint} 
                onClick={handlePostComplaint}
                isLoading={loading}>{loading ? "Submitting..." : "SUBMIT"}
                </Button>
                <button 
                className={extra.complaint}>
                <Link href={`/complaint/${userId}/view-my-complaints`}>View Complaints</Link>
                </button>
              </div>

          </form>
        </div>
      </div>
    </div>
  </>
  );
}