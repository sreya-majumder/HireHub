"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from "@nextui-org/react";
import NavSigned from '@/components/NavSigned';
import extra from '../../../../style/select.module.scss';
import styles from '../../../../style/extra.module.css';
interface Job {
  _id: string;
  title: string;
  description: string;
  companyName: string;
  salary: string;
  location: string;
  skills: string[];
}
interface JobListProps {
  params: { id: string };
}

const JobList: React.FC<JobListProps> = ({ params}) => {
  const { id } = params;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [minSalary, setMinSalary] = useState<number | null>(null);
  const [maxSalary, setMaxSalary] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  const salaryRangeOptions = [
    { label: 'All Salaries', min: null, max: null },
    { label: '15 - 25', min: 15, max: 25 },
    { label: '25 - 35', min: 25, max: 35 },
    { label: '35 - 50', min: 35, max: 50 },
    { label: '50 - 100', min: 50, max: 100 },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`/api/applicants/${id}/job`, {
          params: { search: searchQuery, location: locationFilter, minSalary, maxSalary, skill: selectedSkill }
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchQuery, locationFilter, minSalary, maxSalary, selectedSkill]);


return (

  <>

  <NavSigned />
  <div className="min-h-screen flex flex-col gap-2 bg-gradient-to-r text-black bg-clip-text animate-gradient">

  <div className='flex flex-row justify-center p-3 mt-2 '>
  <div className='mt-1'>
  
    {/* Search Bar */}
    <input
      type="text"
      className='search '
      placeholder="Search by Title"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      
    /></div>

    {/* Location Filter */}
    <div>
    <article className="md:grid grid-cols-4 gap-2  ">
    <select className={extra.selec}
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      
    >
      <option value="">All Locations</option>
      <option value="Dhaka">Dhaka</option>
      <option value="Rangpur">Rangpur</option>
      <option value="Chittagong">Chittagong</option>
      <option value="USA">USA</option>
      {/* Add more locations as needed */}
    </select>

    {/* Skill Filter */}
    <select className={extra.selec}
      value={selectedSkill}
      onChange={(e) => setSelectedSkill(e.target.value)}
      
    >
      <option value="">All Skills</option>
      <option value="Nodejs">Nodejs</option>
      <option value="Reactjs">Reactjs</option>
      <option value="Expressjs">Expressjs</option>
      <option value="Numpy">Numpy</option>
      {/* Add more skills as needed */}
    </select>

    {/* Salary Range Filter */}
    <select className={extra.selec}
      onChange={(e) => {
        const selectedOption = salaryRangeOptions.find(option => option.label === e.target.value);
        if (selectedOption) {
          setMinSalary(selectedOption.min);
          setMaxSalary(selectedOption.max);
        } else {
          setMinSalary(null);
          setMaxSalary(null);
        }
      }}
    >
      {salaryRangeOptions.map(option => (
        <option key={option.label} value={option.label}>{option.label}</option>
      ))}
    </select>

    <button className={styles.complaint}><Link href={`/applicants/${id}/suggested-jobs`}>Suggested/Demanded Jobs</Link> </button>
    </article>
    </div>
    </div>

    {/* Job Listings */}
    
          <div>
      <h1 className="flex justify-center text-black text-xl font-bold">All Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredJobs.map((job) => (
          <div className="text-black rounded-lg shadow-lg bg-purple-100 p-6  ml-3 mt-3 mr-3">
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }}>
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
          </div>
        ))
      )}


    </div>

  </div>

  </>
);
};

export default JobList;
