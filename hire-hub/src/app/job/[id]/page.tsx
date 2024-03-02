import axios from "axios";
import { Metadata } from "next";

export default async function page({ params }: { params: { id: string } }) {
  const response = await axios.get(
    `http://localhost:3000/api/job/${params.id}`
  );
  const { data } = response;

  const job = data.data;

  return (
    <div className="min-h-screen flex flex-col p-12 bg-black text-white gap-4 text-4xl font-medium">
      <h1 className=" text-5xl font-bold">{job.title}</h1>
      <h2>Company: {job.companyName}</h2>
      <h3>Salary: {job.salary}</h3>
      <h3>Location: {job.location}</h3>
      <p className="text-lg font-normal">{job.description}</p>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const response = await axios.get(
    `http://localhost:3000/api/job/${params.id}`
  );
  const { data } = response;
  const job = data.data;

  return {
    title: job.title + " | Hire Hub",
    description: job.description,
  };
}
