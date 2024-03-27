"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from "@nextui-org/react";
import NavSigned from '@/components/NavSigned';

interface Job {
  _id: string;
  title: string;
  companyName: string;
  salary: string;
  location: string;
  skills: string[];
}

interface JobListProps {
  params: { id: string };
}

const JobList: React.FC<JobListProps> = ({ params }) => {
  const { id } = params;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`/api/applicants/${id}/suggested-jobs`);
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
    <NavSigned />

    <div className="h-screen  bg-gradient-to-r text-black bg-clip-text animate-gradient">
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <h1>Suggested Jobs</h1>
        {loading && <p>Loading...</p>}
      </div>

      {/* Job Listings */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {jobs.map((job) => (
          <div
            key={job._id}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '99%' }}
          >
            <h2>{job.title}</h2>
            <p>Company: {job.companyName}</p>
            <p>Salary: {job.salary}</p>
            <p>Location: {job.location}</p>
            <p>Skills: {job.skills.join(', ')}</p>

            <div style={{ marginBottom: '10px' }}>
              <Link href={`/job/${job._id}`}>
                <Button>Apply</Button>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default JobList;
