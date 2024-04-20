"use client"

import { Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavRec from "@/components/NavRec";
import { Button } from "@nextui-org/react";

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

    <>

    <NavRec />


  <div className="h-full flex flex-col gap-2 min-h-screen justify-center items-center bg-gradient-to-r text-transparent bg-clip-text animate-gradient">

      <h1 className="text-5xl text-black font-semibold p-4 ">Recommend?</h1>
        <Input
          type="text"
          className="w-1/4"
          value={recommendation}
          onChange={(e:any) => setRecommendation(e.target.value)}
          placeholder="Enter recommendation text"
        />
        <Button color="secondary" variant="faded" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding Recommendation..." : "Add Recommendation"}
        </Button>
    </div>


    </>
  );
}
