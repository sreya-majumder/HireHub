"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from "@nextui-org/react";

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
  <div>
    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search by Title"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ marginBottom: '10px', width: '100%' }}
    />

    {/* Location Filter */}
    <select
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      style={{ marginBottom: '10px', width: '100%' }}
    >
      <option value="">All Locations</option>
      <option value="Dhaka">Dhaka</option>
      <option value="Rangpur">Rangpur</option>
      <option value="Chittagong">Chittagong</option>
      <option value="USA">USA</option>
      {/* Add more locations as needed */}
    </select>

    {/* Skill Filter */}
    <select
      value={selectedSkill}
      onChange={(e) => setSelectedSkill(e.target.value)}
      style={{ marginBottom: '10px', width: '100%' }}
    >
      <option value="">All Skills</option>
      <option value="Nodejs">Nodejs</option>
      <option value="Reactjs">Reactjs</option>
      <option value="Expressjs">Expressjs</option>
      <option value="Numpy">Numpy</option>
      {/* Add more skills as needed */}
    </select>

    {/* Salary Range Filter */}
    <select
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
      style={{ marginBottom: '10px', width: '100%' }}
    >
      {salaryRangeOptions.map(option => (
        <option key={option.label} value={option.label}>{option.label}</option>
      ))}
    </select>

    {/* Job Listings */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job._id}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '100%' }}
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
        ))
      )}
    </div>
  </div>
);
};

export default JobList;
