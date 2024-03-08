"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { signOut, useSession } from "next-auth/react";
interface Recruiter {
  _id: string;
  name: string;
}
// Use efftect to fetch the recruiters from the server
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


// getting id for navbar

const user = useSession();
const { data: session, status } = useSession();

const [stored, setstored] = React.useState(undefined);

useEffect(() => {
  const fetchData = async () => {
    const userInformation = user.data?.user;
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

    <title>Home</title>

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
                <p className="text-gray-300 hover:text-white px-4"><Link href={`/recruiter/profile/${stored}`}>Profile</Link></p>
                <button
                  className="button1"
                  onClick={() => {
                    signOut();
                  }}
                >
                <Link href="/login">Sign Out</Link> 
                  
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
    <div>
      
      
    <div className="height-100 width-100 border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
  <h1 className='text-black'>Recruiters</h1>
  <ul>
    {recruiters.length === 0 ? (
      <li className='text-black'>No recruiters found</li>
    ) : (
      recruiters.map((recruiter) => (
        // <div className="height-100 width-100 border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <li key={recruiter._id}>
          
          <Link href={`/recruiter/public-profile/${recruiter._id}`}>
            <span style={{ cursor: 'pointer' }}><p className='text-black'>{recruiter.name}</p></span>
          </Link>
        </li>
      ))
    )}
  </ul>
</div>

    


    
    </div></div>
    </>
  );
};

export default Recruiters;
