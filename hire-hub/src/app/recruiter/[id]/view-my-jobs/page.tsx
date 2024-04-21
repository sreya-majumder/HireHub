"use client"

import { useState, useEffect } from "react";
import axios from "axios";
// import { Button } from '@nextui-org/react';
// import Link from 'next/link';

export default function Jobs({ params }: { params: { userId: string } }) {
  const { userId } = params;

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/recruiter/${userId}/view-my-complaints`);
        setJobs(response.data.jobs.reverse());
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-12">
      <h1 className="text-5xl font-semibold mb-8">Jobs posted by Me</h1>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul>
          {jobs.map((job, index) => (
            <li key={index} className="mb-8">
                <p className="mt-2">{job.title}</p>
                <p className="mt-2">{job.companyName}</p>
                <p className="mt-2">{job.salary}</p>
                <p className="mt-2">{job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
