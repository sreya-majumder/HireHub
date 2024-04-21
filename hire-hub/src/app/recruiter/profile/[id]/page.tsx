"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "@/style/job-post.module.css";
import { Button } from "@nextui-org/react";
import ProfileBlog from "@/components/ProfileBlog";
import NavRec from "@/components/NavRec";

interface Applicant {
  name: string;
  email: string;
  city: string;
  country: string;
  number: string;
  skills: Skill[];
  projects : Project[];
  job: Job[]
}

interface Skill {
  name: string;
}

interface Project {
  name: string;
}

interface Job {
  role : string
  company : string
}

export default function ApplicantProfile({
  params,
}: {
  params: { id: string };
}) {
  const [applicantData, setApplicantData] = useState<Applicant | null>(null);
  const { data: session, status } = useSession();
  const user = useSession();
  const [stored, setStored] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchApplicantData() {
      try {
        const response = await axios.get(`/api/applicants/${params.id}/profile`);
        setApplicantData(response.data.applicant);
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    }

    fetchApplicantData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      const userInformation = user.data?.user as { _id?: string };
      const userId = userInformation?._id;

      setStored(userId);
    };
    fetchData();
  }, [user]);


  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/reco/${id}`);
        setRecommendations(response.data.recommendations.reverse());
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [id]);



  return (
    <>
    <title>My Profile</title>

    <NavRec />



    <div className="min-h-screen flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
<div className="flex flex col border border-gray-300 rounded p-4 ml-3 mr-3 mt-3">
        {applicantData && (
          <div className="rounded-lg shadow-lg bg-purple-100 p-6 mt-6 w-1/2">
            <h1 className="text-5xl text-black font-semibold ml-3">
              {applicantData.name}
            </h1>
            <h1 className="text-xl text-black font-semibold ml-3">
            {renderJobs(applicantData.job)}
            </h1>
            <h1 className="text-xl text-black font-semibold ml-3">
            {renderOrgan(applicantData.job)}
            </h1>

            <article className="md:grid grid-cols-3 gap-4 p-3">
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Email: {applicantData.email}
            </p>
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              City: {applicantData.city}
            </p>
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Country: {applicantData.country}
            </p>
            </article>
            <article className="md:grid grid-cols-2 gap-4 p-3">
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Number: {applicantData.number}
            </p>

            </article>
          

            
        
        
        <div className="flex flex-row gap-4 p-3">

        
        <Link href={`/applicants/view-reco/${params.id}`}>
        {/* <Link href={`/recommendations/${params.id}`} passHref> */}
          <Button color="primary">View My Reviews</Button>
        </Link>

        <Button color="primary">
          <Link href="/me">Update Information</Link>
        </Button>

        <Button color="success">
          <Link href={`/recruiter/public-profile/${stored}`}>Public Profile</Link>
        </Button>
        </div>
      </div>
      )} 


      <div className="rounded-lg shadow-lg bg-purple-100 p-6 mt-6 ml-2 w-1/2">

      
      <h1 className="text-black text-5xl font-semibold">Reviews</h1>
      {loading ? (
        <p>Loading Reviews...</p>
      ) : (
        <ul>
          
          {recommendations.map((recommendation, index) => (
            <li key={index}>
              <div className="flex flex col border border-gray-400 rounded mt-2">
              
              <p className="text-black text-l">{recommendation.recruiterName} : {recommendation.recommendation}</p>
              <p className="text-black text-l"></p></div>
              
            </li>
            
          ))}
          
        </ul>
      )}

      </div>
      </div>
      

      <ProfileBlog params={params} />

      </div>
    

    </>
  );
}




function renderJobs(jobs: (string | Job)[]) {
  return jobs.map((job) => {
    if (typeof job === "string") {
      return job;
    } else {
      return job.role;
    }
  }).join(", ");
}

function renderOrgan(jobs: (string | Job)[]) {
  return jobs.map((job) => {
    if (typeof job === "string") {
      return job;
    } else {
      return job.company;
    }
  }).join(", ");
}

