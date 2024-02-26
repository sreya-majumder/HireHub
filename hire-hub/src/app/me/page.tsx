"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default function page() {
  // TODO: 1. Get the current logged in user

  const user = useSession();

  if (!user) {
    return <h1>Please login</h1>;
  }

  // TODO: 2. Show the user information

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-5xl font-semibold">
        {user.data?.user?.name}'s Profile
      </h1>
      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-3xl font-semibold">Location</h3>
        <p></p>
      </div>
    </div>
  );
}
