'use client';

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Input } from "@nextui-org/react";

export default function RecruiterReview({ params }) {
  const recId = params.id
  const [name, setName] = React.useState("");
  const [review, setReview] = React.useState("");


  async function handleSaveReview() {
    fetch(`http://localhost:3000/api/recruiter/review/${recId}`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        review: review,
        id: recId,
      }),
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      {/* <h1 className="text-5xl font-semibold">
        {user.data?.user?.name}'s Profile
      </h1>
      <div className="flex flex-col gap-3 py-4">
        <h3 className="text-3xl font-semibold">Location</h3>
        {userInfo && (
          <p className="text-lg">
            
            {userInfo.city}
            {userInfo.country}
          </p>
        )} */}

       



      <div className="flex gap-2 max-w-screen-md items-center">
          <Input
            // placeholder={role == "" && "Name"}
            size="sm"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            // placeholder={company == "" && "Leave Your Review"}
            size="sm"
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <Button
            color="success"
            onClick={() => {
              handleSaveReview();
            }}
          >
            SAVE
          </Button>
        </div>
  
      </div>
    // </div>
  );

}