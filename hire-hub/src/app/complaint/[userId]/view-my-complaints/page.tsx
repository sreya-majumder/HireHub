"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import NavBlogs from "@/components/navbar/NavBlogs";
import extra from '../../../../style/extra.module.css';

export default function Complaints({ params }: { params: { userId: string } }) {
  const { userId } = params;

  const [loading, setLoading] = useState(false);
  const [complaints, setcomplaints] = useState<any[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/complaint/${userId}/view-my-complaints`);
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
    <><title>My Feedback</title>
    <div className="h-screen flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
  <NavBlogs />
    <div className="flex flex-col p-12">
      <h1 className="text-5xl text-white font-semibold mb-8">My Complaints</h1>
      <button className={extra.complaint}><Link href={`/complaint/${userId}/add-complaint`}>Submit Complaint</Link> </button>

      {loading ? (
        <p>Loading feedbackss...</p>
      ) : (
        <ul>
          {complaints.map((complaint, index) => (
            <div className="w-full bg-transparent rounded-lg shadow-md overflow-y-auto p-6">
            <li key={index} className="mb-8">
                <p className="text-black mt-2">{complaint.content}</p>
               
                <p className="text-black mt-2">
                    Creation Date: {new Date(complaint.createdAt).toLocaleDateString()} 
                </p>
                <p className="text-black mt-2">
                    Time: {new Date(complaint.createdAt).toLocaleTimeString()}
                </p>
                
            </li></div>
          ))}
        </ul>
      )}
    </div>
    </div>
    </>
  );
}
