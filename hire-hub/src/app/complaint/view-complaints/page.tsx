"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import NavSigned from "@/components/NavSigned";

export default function AllComplaints() {

  const [loading, setLoading] = useState(false);
  const [complaints, setcomplaints] = useState<any[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/complaint/view-complaints`);
        setcomplaints(response.data.complaints.reverse());
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (

    <div className="h-screen flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
  <NavSigned />

  <div className="flex flex-col p-12">
      <h1 className="text-5xl text-white font-semibold mb-8">User complaints</h1>
      {loading ? (
        <p>Loading feedbackss...</p>
      ) : (
        <ul>
          {complaints.map((complaint, index) => (
              <div className="w-full bg-transparent rounded-lg shadow-md overflow-y-auto p-6">
            <li key={index} className="mb-8">
                <p className="text-black mt-2">{complaint.content}</p>
               
                <p className="text-black mt-2">
                    Post Date: {new Date(complaint.createdAt).toLocaleDateString()} 
                </p>
                <p className="text-black mt-2">
                    Time: {new Date(complaint.createdAt).toLocaleTimeString()}
                </p>
                
            </li></div>
          ))}
        </ul>
      )}
    </div></div>
  );
}
