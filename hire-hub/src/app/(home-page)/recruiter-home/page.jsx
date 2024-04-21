"use client";

import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import NavRec from "@/components/NavRec";
import Bot from "@/components/bot";

export default function Home() {
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
  // console.log(stored);

  return (
    <>

    <title>Home</title>

      <NavRec />
      <div className="h-screen flex flex-col gap-2 justify-center items-center bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
        <div>
          <p className="text-4xl font-bold animate-appear text-black">
            Ready to Post a Job?&nbsp;&nbsp;&nbsp;
          </p>
        </div>

          {/* <div className="flex flex-col gap-4">
            <Link
              href={"/recruiter/job-post"}
              className="text-5xl font-semibold text-white"
            >
              <h1>Are you a recruiter?</h1>
            </Link>
          </div> */}

          <div>
            <Link href="/recruiter/job-post">
              <button className="get_started-io-button">
                Post a Job
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none">
                      <Link href="/recruiter/job-post">Post a Job</Link>
                    </path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </Link>
          </div>


          {/* <div>
            <Link href={`/blog/${stored}/view-blogs`}>
              <button className="get_started-io-button">
                View Blogs
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none">
                      <Link href={`/blog/${stored}/view-blogs`}>View Blogs</Link>
                    </path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </Link>
          </div> */}

          {/* <div>
            <Link href={`/blog/${stored}/create-blog`}>
              <button className="get_started-io-button">
                Create Blogs
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none">
                      <Link href={`/blog/${stored}/create-blog`}>Create Blogs</Link>
                    </path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </Link>
          </div> */}

      </div>



      <Bot />


      <footer className="footer">
        <p>Developed by Zawad, Rupkatha, Sreya</p>
      </footer>


    </>
  );
}
