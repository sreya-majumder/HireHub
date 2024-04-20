"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "@/style/job-post.module.css";
import { Button } from "@nextui-org/react";
import ProfileBlog from "@/components/ProfileBlog";

interface Applicant {
  name: string;
  email: string;
  city: string;
  country: string;
  number: string;
  skills: Skill[];
}

interface Skill {
  name: string;
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
  console.log(applicantData);

  return (
    <>
      <div className="bg-gray-900">
        <div className="container mx-auto px-10">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <button className="search-button">
                <div className="hoverEffect">
                  <Link href="/search">Search</Link>
                  <div></div>
                </div>
              </button>
              <span className="w-5font-semibold text-xl tracking-tight">
                &nbsp;&nbsp;&nbsp;<Link href="/">Jobify</Link>
              </span>
            </div>

            <div className="hidden  md:flex md:items-center md:ml-auto md:mr--10 ">
              <p className="text-gray-300 hover:text-white px-4">
                <Link href="/">Home</Link>
              </p>
              <p className="text-gray-300 hover:text-white px-4">About</p>
              <p className="text-gray-300 hover:text-white px-4">Services</p>

              {session ? (
                <>
                  <p className="text-gray-300 hover:text-white px-4">
                    <Link href={`/applicant/public-profile/${stored}`}>
                      Profile
                    </Link>
                  </p>
                  <button
                    className="button1"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sign Out
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                </>
              ) : (
                <>
                  <button className="button1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href="/login">Sign In</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                  <button className="button2">
                    <Link href="/register">Sign Up</Link>
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>



<div className="h-full flex flex-col gap-2  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
  <div className="flex flex col border border-gray-300 rounded p-4">
        {applicantData && (
          <div className="rounded-lg shadow-lg bg-purple-100 p-6 mt-6 w-1/2">
            <h1 className="text-5xl text-black font-semibold">
              {applicantData.name}
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
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Skills: {renderSkills(applicantData.skills)}
            </p>

            </article>
          

            
        
        
        <div className="flex flex-row gap-4 p-3">
        <Link href={`/recruiter/add-reco/${stored}/${params.id}`} passHref>
          <Button color="primary">Recommend</Button>
        </Link>
        
        <Link href={`/applicants/view-reco/${params.id}`}>
        {/* <Link href={`/recommendations/${params.id}`} passHref> */}
          <Button color="primary">View All Recommendations</Button>
        </Link>

        <Button color="success">
          <Link href="/me">Update Information</Link>
        </Button>
        </div>
      </div>
      )} 


      <div className="rounded-lg shadow-lg bg-purple-100 p-6 mt-6 ml-2 w-1/2">

      
      <h1 className="text-black text-5xl font-semibold">Recommendations</h1>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <ul>
          <div className="flex flex col border border-gray-400 rounded mt-2">
          {recommendations.map((recommendation, index) => (
            <li key={index}>
              
              <p className="text-black text-l">{recommendation.recruiterName} : {recommendation.recommendation}</p>
              <p className="text-black text-l"></p>
              
            </li>
            
          ))}
          </div>
        </ul>
      )}

      </div>
      </div>
      
      <h1 className="text-black text-3xl font-bold">Blogs</h1>
      <ProfileBlog params={params} />

      </div>
    

    </>
  );
}

function renderSkills(skills: (string | Skill)[]) {
  return skills.map((skill) => {
    if (typeof skill === "string") {
      return skill;
    } else {
      return skill.name;
    }
  }).join(", ");
}
