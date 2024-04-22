"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@nextui-org/react';
import Link from 'next/link'; // Import Link from next/link
import NavRec from "@/components/NavRec";

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

    <>
    <title>My Jobs</title>

    <NavRec />

    <div className="min-h-screen flex flex-col gap-2  bg-gradient-to-r text-black bg-clip-text animate-gradient">

      <h1 className="flex justify-center text-4xl font-semibold mb-8 p-3 mt-3">My Jobs</h1>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul>
          {jobs.map((job, index) => (


        <div className="text-black rounded-lg shadow-lg bg-purple-100 p-6  ml-3 mt-3 mr-3">
            <div key={job._id} style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }}>
              <li className="mb-8">

                
                <Link href={`/job/${job._id}/view-job-details`}>
                <p className="text-black font-semibold text-2xl">{job.title}</p>
                </Link>
                <p className="text-black mt-2">Company Name: {job.companyName}</p>
                <p className="text-black mt-2">Location: {job.location}</p>
                <p className="text-black mt-2">Salary: {job.salary}</p>
                
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
            </div>

          ))}
        </ul>
      )}
    </div>
    </>
  );
}

