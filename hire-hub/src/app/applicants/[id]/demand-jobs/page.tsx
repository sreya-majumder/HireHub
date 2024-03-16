"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@nextui-org/react";
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  companyName: string;
  salary: string;
  location: string;
  description: string;
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
          const response = await axios.get(`/api/applicants/${id}/demand-jobs`);
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
    <div>
      <h1>High Demand Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h2>{job.title}</h2>
            <p>Company: {job.companyName}</p>
            <p>Salary: {job.salary}</p>
            <p>Location: {job.location}</p>
            <p>Description: {job.description}</p>
            <p>Skills: {job.skills.join(', ')}</p>
            <div style={{ marginBottom: '10px' }}>
              <Link href={`/job/${job._id}`}>
                <Button>Apply</Button>
              </Link>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
