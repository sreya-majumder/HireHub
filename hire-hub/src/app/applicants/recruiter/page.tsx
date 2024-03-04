"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Recruiter {
  _id: string;
  name: string;
}

const Recruiters: React.FC = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get('/api/applicants/recruiter');
        setRecruiters(response.data);
      } catch (error) {
        console.error('Error fetching recruiters:', error);
      }
    };

    fetchRecruiters();
  }, []);

  return (
    <div>
      <h1>Recruiters</h1>
      <ul>
        {recruiters.length === 0 ? (
          <li>No recruiters found</li>
        ) : (
            recruiters.map((recruiter) => (
            <li key={recruiter._id}>
              <Link href={`/recruiter/profile/${recruiter._id}`}>
                <span style={{ cursor: 'pointer' }}>{recruiter.name}</span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Recruiters;
