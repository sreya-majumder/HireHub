"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";


export default function Profile() {

    const user = useSession();
    const fetchData = async () => {
        const userInformation = user.data?.user;
        const userId = userInformation?._id;
  
        const response = await fetch(`http://localhost:3000/api/my-profile`, {
          method: "POST",
          body: JSON.stringify({ id: userId }),
        });
        const data = await response.json();
        const userData = data.data
        console.log(userData)  // userinfo
      };
      fetchData()


  


  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">

    </div>
  );
}
