"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {signOut, useSession } from "next-auth/react";
import styles from "@/style/job-post.module.css"
import { Button } from "@nextui-org/react";
interface Recruiter {
  name: string;
  email: string;
  city: string;
  country: string;
  number: string;
}

export default function RecruiterProfile({ params }: { params: { id: string } }) {
  const [recruiterData, setRecruiterData] = useState<Recruiter | null>(null);
  const { data: session, status } = useSession();
  const user = useSession();
  const [stored, setstored] = React.useState(undefined);
//This use effect is used to get the recruiter data and then store it in the recruiterData variable
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


//This use effect is used to get the user id and then store it in the stored variable
  useEffect(() => {
    const fetchData = async () => {
      const userInformation = user.data?.user as { _id?: string };
      const userId = userInformation?._id;

      const response = await fetch(`http://localhost:3000/api/my-profile`, {
        method: "POST",
        body: JSON.stringify({ id: userId }),
      });
      const data = await response.json();

      setstored(userId);
    };
    fetchData();
  }, [user]);
  console.log(stored);

  
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
              <p className="text-gray-300 hover:text-white px-4"><Link href={`/recruiter/public-profile/${stored}`}>Profile</Link></p>
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

      {recruiterData && (
        <div className={styles.form}>
          <h1 className="text-5xl text-black justify-center items-center text-center font-semibold">{recruiterData.name}'s Profile</h1>
          
          <p className='border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300' >Name: {recruiterData.name}</p>
          <p className='border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300' >Email: {recruiterData.email}</p>
          <p className='border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300' >City: {recruiterData.city}</p>
          <p className='border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300' >Country: {recruiterData.country}</p>
          <p className='border-2 border-gray-300 rounded-lg p-4 text-black text-l bg-white shadow-md hover:shadow-lg transition-shadow duration-300' >Number: {recruiterData.number}</p>
        </div>
      )}
          <div className="flex flex-col gap-3 max-w-screen-sm py-4 ">
        <Link href={`/recruiterReview/${id}`} passHref>
          <Button color="primary">Give review</Button>
        </Link></div>

    </div>
    </>
  );
}
