"use client"

import { Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddRecommendation({ params }: { params: { recruiterId: string, applicantId: string } }) {
  const [recommendation, setRecommendation] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [loading, setLoading] = useState(false);
  const { recruiterId, applicantId } = params;
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/recruiter/add-reco/${recruiterId}/${applicantId}`, {
        recommendation,
      });
      console.log(response.data);
      setRecommendation("");
      setRecruiterName("");
      router.push(`http://localhost:3000/recruiter/${recruiterId}/applicants`);
    } catch (error) {
      console.error("Error adding recommendation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-5xl font-semibold">Add Recommendation</h1>
      <div className="flex flex-col gap-3 max-w-screen-sm py-4">
      
        <Input
          type="text"
          value={recommendation}
          onChange={(e:any) => setRecommendation(e.target.value)}
          placeholder="Enter recommendation text"
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding Recommendation..." : "Add Recommendation"}
        </button>
      </div>
    </div>
  );
}
