
"use client"

// pages/recruiter/applicants.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Applicant {
  _id: string;
  name: string;
  // Add other properties as needed
}

const Applicants: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('/api/recruiter/applicants');
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div>
      <h1>Applicants</h1>
      <ul>
        {applicants.length === 0 ? (
          <li>No applicants found</li>
        ) : (
          applicants.map((applicant) => (
            <li key={applicant._id}>
              <Link href={`/profile/${applicant._id}`}>
                <span style={{ cursor: 'pointer' }}>{applicant.name}</span>
              </Link>
            </li>
            // Add other properties as needed
          ))
        )}
      </ul>
    </div>
  );
};

export default Applicants;
