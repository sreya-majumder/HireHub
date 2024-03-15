"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "@/style/job-post.module.css";
import { Button } from "@nextui-org/react";

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
      <div className="h-screen flex flex-col gap-2 justify-center items-center bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
        {applicantData && (
          <div className={styles.form}>
            <h1 className="text-5xl text-black justify-center items-center text-center font-semibold">
              {applicantData.name}'s Profile
            </h1>

            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Name: {applicantData.name}
            </p>
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Email: {applicantData.email}
            </p>
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              City: {applicantData.city}
            </p>
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Country: {applicantData.country}
            </p>
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Number: {applicantData.number}
            </p>
            <p className="border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              Skills: {renderSkills(applicantData.skills)}
            </p>
          </div>
        )}

        <Link href={`/recruiter/add-reco/${params.id}`} passHref>
          <Button color="primary">Recommend</Button>
        </Link>

        <Link href={`/recommendations/${params.id}`} passHref>
          <Button color="primary">Previous Recommendations</Button>
        </Link>
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