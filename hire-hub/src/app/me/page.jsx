'use client';

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Input } from "@nextui-org/react";

export default function MePage() {
  const user = useSession();

  

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

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-5xl font-semibold">
        {user.data?.user?.name}'s Profile
      </h1>
      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-3xl font-semibold">Location</h3>
        {userInfo && (
          <p className="text-lg">
            
            {userInfo.city}
            {userInfo.country}
          </p>
        )}

        <div className="flex gap-2 max-w-screen-md items-center">
          <Input
            placeholder={city == "" && "City"}
            size="sm"
            onChange={(e) => {
              setcity(e.target.value);
            }}
          />
          <Input
            placeholder={country == "" && "Country"}
            size="sm"
            onChange={(e) => {
              setcountry(e.target.value);
            }}
          />
          <Button
            color="success"
            onClick={() => {
              console.log()
              handleSaveLocation();
            }}
          >
            SAVE
          </Button>
        </div>
      </div>



      <div className="flex gap-2 max-w-screen-md items-center">
          <Input
            placeholder={role == "" && "Job Role"}
            size="sm"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
          <Input
            placeholder={company == "" && "Company"}
            size="sm"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          <Input
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
        <h3 className="text-3xl font-semibold">Skills</h3>
        {/* {userInfo &&
          userInfo.skills &&
          userInfo.skills.map((skill) => (
            <p className="text-lg">{skill.name}</p>
          ))} */}

        <div className="flex gap-2 max-w-screen-md items-center">
          <Input
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
        <h3 className="text-3xl font-semibold">Projects</h3>
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
            placeholder={"Project Name"}
            size="sm"
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
          <Input
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
      </div>
    </div>
  );
}
