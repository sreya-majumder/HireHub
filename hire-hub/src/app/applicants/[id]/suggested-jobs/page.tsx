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
  description: string;
  skills: string[];
}

interface JobListProps {
  params: { id: string };
}

const JobList: React.FC<JobListProps> = ({ params }) => {
  const { id } = params;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [demanded, setDemanded] =  useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingg, setLoadingg] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`/api/applicants/${id}/demand-jobs`);
        setDemanded(response.data);
        setLoadingg(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoadingg(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
    <title>Suggested & Demanded Jobs</title>
    <NavSigned />



    <div className="min-h-screen flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
<div className="flex flex-row border border-gray-300 rounded p-4 ml-3 mr-3 mt-3">



    <div className=" text-black rounded-lg shadow-lg bg-purple-100 p-6 mt-3 w-1/2">
    <div>

        <h1 className="flex justify-center text-black text-xl font-bold">Suggested Jobs</h1>
        {loadingg && <p>Loading...</p>}

      {/* Job Listings */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {jobs.map((job) => (
          <div
            key={job._id}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '99%' }}
          >
            <h2 className='font-semibold text-xl'>{job.title}</h2>
            <p>Company: {job.companyName}</p>
            <p>Salary: {job.salary}</p>
            <p>Location: {job.location}</p>
            <p>Skills: {job.skills.join(', ')}</p>

            <div style={{ marginBottom: '10px' }}>
              <Link href={`/job/${job._id}`}>
                <Button color="success">Apply</Button>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>

    </div>

    <div className="text-black rounded-lg shadow-lg bg-purple-100 p-6  ml-3 mt-3 w-1/2">
          <div>
      <h1 className="flex justify-center text-black text-xl font-bold">High Demand Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        demanded.map((job) => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h2 className='font-semibold text-xl'>{job.title}</h2>
            <p>Company: {job.companyName}</p>
            <p>Salary: {job.salary}</p>
            <p>Location: {job.location}</p>
            <p>Description: {job.description}</p>
            <p>Skills: {job.skills.join(', ')}</p>
            <div style={{ marginBottom: '10px' }}>
              <Link href={`/job/${job._id}`}>
                <Button color="success">Apply</Button>
              </Link>
            </div>

          </div>
        ))
      )}
    </div>

    </div>
    </div>
    </div>



    </>
  );
};

export default JobList;
