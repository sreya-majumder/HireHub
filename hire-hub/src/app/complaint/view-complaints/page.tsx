"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import Link from 'next/link';

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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-12">
      <h1 className="text-5xl font-semibold mb-8">Feedbacks</h1>
      {loading ? (
        <p>Loading feedbackss...</p>
      ) : (
        <ul>
          {complaints.map((complaint, index) => (
            <li key={index} className="mb-8">
                <p className="mt-2">{complaint.content}</p>
               
                <p className="text-gray-500 mt-2">
                    Post Date: {new Date(complaint.createdAt).toLocaleDateString()} 
                </p>
                <p className="text-gray-500 mt-2">
                    Time: {new Date(complaint.createdAt).toLocaleTimeString()}
                </p>
                
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
