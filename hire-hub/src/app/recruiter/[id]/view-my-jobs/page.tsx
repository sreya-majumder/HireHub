"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
// import Link from 'next/link';

export default function Jobs({ params }: { params: { id: string } }) {
  const userId  = params.id;

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/recruiter/${userId}/view-my-jobs`);
        setJobs(response.data.jobs.reverse());
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  async function handleDelete(jobId : any) {
    fetch(`http://localhost:3000/api/job/delete-job`, {
      method: "POST",
      body: JSON.stringify({
        id: jobId,
      }),
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-12">
      <h1 className="text-5xl font-semibold mb-8">Jobs posted by Me</h1>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul>
              {jobs.map((job, index) => (
                <div key={index} className="w-full bg-transparent rounded-lg shadow-md overflow-y-auto p-6">
                  <li  className="mb-8">
                    <p className="text-black mt-2">{job.title}</p>
                    <p className="text-black mt-2">{job.companyName}</p>
                    <p className="text-black mt-2">{job.location}</p>
                    <p className="text-black mt-2">{job.salary}</p>
                    
                  </li>
                  <Button
                    color="success"
                    onClick={() => {
                      handleDelete(job._id);
                    }}
                    >
                    Delete
                  </Button>
                </div>
          ))}
            </ul>

      )}

  
    </div>
  );
}

