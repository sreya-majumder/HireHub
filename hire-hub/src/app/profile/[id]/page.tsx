"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";



export default function UserProfile({ params }: any) {
  const [location, setlocation] = useState("");

  const { id } = params;
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-5xl font-semibold">{id}'s Profile</h1>
      <h3 className="text-3xl font-semibold"></h3>

      <div className="flex flex-col gap-3 max-w-screen-sm py-4 ">
        <h3 className="text-3xl font-semibold ">Location</h3>
        <p className="text-lg">
          Update your location to showcase your skills and experience to the
          world
        </p>
        <Input label="Location" onChange={(e) => setlocation(e.target.value)} />
        <Button
          color="primary"
          className="w-min"
          onPress={() => console.log(location)}
        >
          Update Location
        </Button>
      </div>

      <div className="flex flex-col gap-3 max-w-screen-sm py-4 ">
        <h3 className="text-3xl font-semibold ">Skills</h3>
        <p className="text-lg">Add your skills to portray on your profile.</p>

        <Input label="Location" onChange={(e) => setlocation(e.target.value)} />
        <Button
          color="primary"
          className="w-min"
          onPress={() => console.log(location)}
        >
          Update Location
        </Button>
      </div>

      <div className="flex flex-col gap-3 max-w-screen-sm py-4 ">
        <Link href={`/recruiter/add-reco/${id}`} passHref>
          <Button color="primary">Recommend</Button>
        </Link>

        <Link href={`/recommendations/${id}`} passHref>
          <Button color="primary">Recommendations</Button>
        </Link>
      </div>


      {/* 
            Skills
            Experience 
            Projects
    */}
    </div>
  );
}
