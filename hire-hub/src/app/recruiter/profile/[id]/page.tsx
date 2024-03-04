"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Recruiter {
  name: string;
  email: string;
}

export default function RecruiterProfile({ params }: { params: { id: string } }) {
  const [recruiterData, setRecruiterData] = useState<Recruiter | null>(null);

  useEffect(() => {
    async function fetchRecruiterData() {
      try {
        const response = await axios.get(`/api/recruiter/${params.id}/profile`);
        setRecruiterData(response.data.recruiter);
      } catch (error) {
        console.error("Error fetching recruiter data:", error);
      }
    }

    fetchRecruiterData();
  }, [params.id]);

  const { id } = params;
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-5xl font-semibold">{id}'s Profile</h1>
      {recruiterData && (
        <div>
          <p>Name: {recruiterData.name}</p>
          <p>Email: {recruiterData.email}</p>
        </div>
      )}
    </div>
  );
}
