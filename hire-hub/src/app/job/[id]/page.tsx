import ApplyJob from "@/components/ApplyJob";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import styles from "@/style/job-post.module.css"
export default async function page({ params }: { params: { id: string } }) {
  const response = await axios.get(
    `http://localhost:3000/api/job/${params.id}`
  );
  const { data } = response;

  const job = data.data;

  return (
<>
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
            &nbsp;&nbsp;&nbsp;<Link href="/applicant-home">Jobify</Link>
          </span>
        </div>

        <div className="hidden  md:flex md:items-center md:ml-auto md:mr--10 ">
          <p className="text-gray-300 hover:text-white px-4">
            <Link href="/applicant-home">Home</Link>
          </p>
        </div>
      </nav>
    </div>
  </div>

    <div className="h-screen flex flex-col gap-2 justify-center items-center  bg-gradient-to-r text-transparent bg-clip-text animate-gradient">
      <div className={styles.form}>
      <h1 className={styles.title}>Apply for {job.title}</h1>
      <h2 className="text-black text-3xl">Basic Information</h2>
      <h2 className="text-black text-2xl">Company: {job.companyName} &nbsp;&nbsp; Salary: {job.salary} &nbsp;&nbsp;  Location: {job.location}</h2>
      <p className="text-lg text-black">Description: &nbsp;&nbsp;{job.description}</p>
      <ApplyJob jobId={job._id} />
    </div></div></>
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
