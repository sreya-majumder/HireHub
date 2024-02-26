"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function page() {
  // TODO: 1. Get the current logged in user

  const user = useSession();

  if (!user) {
    return <h1>Please login</h1>;
  }

  // TODO: 2. Show the user information

  const [userInfo, setuserInfo] = React.useState(undefined);

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
    };
    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-5xl font-semibold">
        {user.data?.user?.name}'s Profile
      </h1>
      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-3xl font-semibold">Location</h3>
        {userInfo && (
          <p className="text-lg">
            {userInfo.city}, {userInfo.country}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-3xl font-semibold">Skills</h3>
        {userInfo &&
          userInfo.skills &&
          userInfo.skills.map((skill) => (
            <p className="text-lg">{skill.name}</p>
          ))}
      </div>

      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-3xl font-semibold">Projects</h3>
        {userInfo &&
          userInfo.projects &&
          userInfoprojects.map((project) => (
            <div className="flex flex-col gap-2">
              <p className="text-lg">{project.name}</p>
              <p className="text-lg">{project.about}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
