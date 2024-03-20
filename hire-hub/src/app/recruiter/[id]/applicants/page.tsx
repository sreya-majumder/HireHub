"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@nextui-org/react';


interface Applicant {
  _id: string;
  name: string;
}
export default function Applicants({ params }: any) {
  const { id } = params;
  //const Applicants: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`/api/recruiter/${id}/applicants`);
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
              <Link href={`/applicants/public-profile/${applicant._id}`}>
                <span style={{ cursor: 'pointer', marginRight: '10px' }}>{applicant.name}</span>
              </Link>

              <Link href={`/recruiter/add-reco/${id}/${applicant._id}`} passHref>
                <Button color="secondary">Recommend</Button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};


