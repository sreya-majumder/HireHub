"use client"

// Import necessary modules
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from '../../../../style/feedback.module.css';
import NavSigned from "@/components/NavSigned";
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

  return (
<div className="h-screen flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
  <NavSigned />
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
  <Button className={styles.button3} onClick={handlePostComplaint}
    isLoading={loading}>{loading ? "Submitting..." : "SUBMIT"}</Button>
  </div>

      </form>
    </div>
  </div></div>
    // <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
    //   <h3 className="text-3xl font-semibold">Leave Your Feedback</h3>
    //   <div className="flex gap-2 max-w-screen-md items-center">
    //     <Input
    //       size="sm"
    //       placeholder="Your Feedback"
    //       value={content}
    //       onChange={(e) => setContent(e.target.value)}
    //     />
    //     <Button
    //       color="success"
    //       onClick={handlePostComplaint}
    //       isLoading={loading}
    //     >
    //       {loading ? "Submitting..." : "SUBMIT"}
    //     </Button>
    //   </div>
    // </div>
  );
}