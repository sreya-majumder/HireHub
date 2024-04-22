"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavRec from '@/components/NavRec';

interface JobListProps {
    params: { id: string };
}

const ViewJobDetails: React.FC<JobListProps> = ({ params }) => {
    const { id } = params;
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchJob() {
            try {
                const response = await axios.get(`/api/job/${id}/view-job-details`);
                if (response.status === 200) {
                    const { title, companyName, salary, location, description, applicants } = response.data.job;
                    setJob({ title, companyName, salary, location, description, applicants });
                } else {
                    console.error('Failed to fetch job');
                }
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchJob();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!job) {
        return <div>Job not found</div>;
    }

    return (

        <>

        <title>Job Details</title>

        <div className='min-h-screen flex flex-col gap-2  bg-gradient-to-r text-black bg-clip-text animate-gradient'>
        <NavRec />
        <div>

        <div className="text-black rounded-lg shadow-lg bg-purple-100 p-6  ml-3 mt-3 mr-3">
            <div key={job._id} style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }}>
            <h1 className='flex justify-center text-4xl font-bold'>Job Details</h1>
            <p className=' text-xl font-semibold'>{job.title}</p>
            <p className=' text-xl font-semibold'>Company Name: {job.companyName}</p>
            <p className=' text-xl font-semibold'>Salary: {job.salary}</p>
            <p className=' text-xl font-semibold'>Location: {job.location}</p>
            <p className=' text-xl font-semibold'>Description: {job.description}</p>

            </div>
        </div>
        <div className="flex justify-center text-black text-4xl font-semibold rounded-lg shadow-lg bg-emerald-100 p-6  ml-3 mt-3 mr-3">
        <h2>Applicants</h2> </div>
            <ul>
                {job.applicants.map((applicant: any) => (
                    <div className="text-black rounded-lg shadow-lg bg-emerald-100 p-6  ml-3 mt-3 mr-3">
                    <div key={job._id} style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }}>
                    
                    <li key={applicant.applicantUserId}>
                    <Link href={`/applicants/public-profile/${applicant.applicantUserId}`}>
                       <span className='text-xl p-1'>{applicant.fullName}</span>
                    </Link>
                    <p className='text-xl p-1'>Mobile Number: {applicant.mobileNumber}</p>
                    <p className='text-xl p-1'>Email: {applicant.email}</p>
                    <p className='text-xl p-1'>Location: {applicant.location}</p>
                    <p className='text-xl p-1'>Resume Link: {applicant.resumeLink}</p>
                    
                </li>
                </div>
                </div>
                ))}
            </ul>
        </div>

        </div>
        </>
    );
};

export default ViewJobDetails;
