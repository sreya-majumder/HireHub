'use client';

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import styles from "@/style/job-post.module.css"
export default function MePage() {
  const user = useSession();
  const { data: session, status } = useSession();
  

  const [userInfo, setuserInfo] = React.useState(undefined);
  const [city, setcity] = React.useState("");
  const [country, setcountry] = React.useState("");
  const [newSkill, setNewSkill] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [projectAbout, setProjectAbout] = React.useState("");
  const [role, setRole] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [description, setDescription] = React.useState("");
  
  if (!user) {
    return <h1>Please login</h1>;
  }


  useEffect(() => {
    const fetchData = async () => {
      const userInformation = user.data?.user;
      const userId = userInformation?._id;

      const response = await fetch(`http://localhost:3000/api/my-profile`, {
        method: "POST",
        body: JSON.stringify({ id: userId }),
      });
      const data = await response.json();
      setuserInfo(data);
      if (data) {
        setcity(data.city);
        setcountry(data.country);
      }
    };
    fetchData();
  }, [user]);

  async function handleSaveProject() {
    fetch("http://localhost:3000/api/my-profile/add-project", {
      method: "POST",
      body: JSON.stringify({
        projectName: projectName,
        projectAbout: projectAbout,
        id: user.data?.user?._id,
      }),
    });
  }

  async function handleSaveLocation() {
    fetch("http://localhost:3000/api/my-profile/add-location", {
      method: "POST",
      body: JSON.stringify({
        city: city,
        country: country,
        id: user.data?.user?._id,
      }),
    });
  }

  async function handleSaveJob() {
    fetch("http://localhost:3000/api/my-profile/add-job", {
      method: "POST",
      body: JSON.stringify({
        role: role,
        company: company,
        description: description,
        id: user.data?.user?._id,
      }),
    });
  }

  async function handleSaveSkill() {
    fetch("http://localhost:3000/api/my-profile/add-skill", {
      method: "POST",
      body: JSON.stringify({
        skillName: newSkill,
        id: user.data?.user?._id,
      }),
    });
  }


  async function handleSaveLocation() {
    fetch("http://localhost:3000/api/my-profile/add-location", {
      method: "POST",
      body: JSON.stringify({
        city: city,
        country: country,
        id: user.data?.user?._id,
      }),
    });
  }

  async function handleDisabled() {
    fetch("http://localhost:3000/api/my-profile/disable-account", {
      method: "POST",
      body: JSON.stringify({
        id: user.data?.user?._id,
      }),
    });
  }

  return (

    <>

    <title>Update Information</title>
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
              <p className="text-gray-300 hover:text-white px-4"><Link href={`/recruiter/profile/${user.data?.user?._id}`}>Profile</Link></p>
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

    <div className={styles.form}>
      <h1 className={styles.title}>Update your profile: {user.data?.user?.name}</h1>
      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-xl text-black font-semibold">Location</h3>
        {userInfo && (
          <p className="text-lg">
            
            {userInfo.city}
            {userInfo.country}
          </p>
        )}

        <div className="flex gap-2 max-w-screen-md items-center">
          <Input
          className={styles.input}
            placeholder={city == "" && "City"}
            size="sm"
            onChange={(e) => {
              setcity(e.target.value);
            }}
          />
          <Input
          className={styles.input}
            placeholder={country == "" && "Country"}
            size="sm"
            onChange={(e) => {
              setcountry(e.target.value);
            }}
          />
          <Link href="/" >
          <Button
            color="success"
            onClick={() => {
              console.log()
              handleSaveLocation();
            }}
          >
            SAVE
          </Button>
          </Link>
        </div>
      </div>



      <div className="flex gap-2 max-w-screen-md items-center">
          <Input
          className={styles.input}
            placeholder={role == "" && "Job Role"}
            size="sm"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
          <Input
          className={styles.input}
            placeholder={company == "" && "Company"}
            size="sm"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          <Input
          className={styles.input}
            placeholder={description == "" && "Description"}
            size="sm"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Button
            color="success"
            onClick={() => {
              handleSaveJob();
            }}
          >
            SAVE
          </Button>
        </div>
  

      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-xl text-black font-semibold">Skills</h3>
        {/* {userInfo &&
          userInfo.skills &&
          userInfo.skills.map((skill) => (
            <p className="text-lg text-black">{skill.name}</p>
          ))} */}

        <div className="flex gap-2 max-w-screen-md items-center">
          <Input
            className={styles.input}
            placeholder={"Type Skill Name"}
            size="sm"
            onChange={(e) => {
              setNewSkill(e.target.value);
            }}
          />

          <Button
            color="success"
            onClick={() => {
              handleSaveSkill();
            }}
          >
            SAVE
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-xl text-black font-semibold">Projects</h3>
        {/* {userInfo &&
          userInfo.projects &&
          userInfoprojects.map((project) => (
            <div className="flex flex-col gap-2">
              <p className="text-lg">{project.name}</p>
              <p className="text-lg">{project.about}</p>
            </div>
          ))} */}

        <div className="flex gap-2 max-w-screen-md items-center">
          <Input
          className={styles.input}
            placeholder={"Project Name"}
            size="sm"
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
          <Input
          className={styles.input}
            placeholder={"About Project"}
            size="sm"
            onChange={(e) => {
              setProjectAbout(e.target.value);
            }}
          />
          <Button
            color="success"
            onClick={() => {
              handleSaveProject();
            }}
          >
            SAVE
          </Button>
        </div>
        <div className="flex gap-2 max-w-screen-md items-center">
        <Button
            color="success"
            onClick={() => {
              handleDisabled();
              console.log(user.data?.user?._id)
            }}
          >
            Delete Account
          </Button>
        </div> 
        
      </div>
    </div>
    </div>
    </>
  );
}
