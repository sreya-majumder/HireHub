"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
        <div>
            <h1>Job Details:</h1>
            <p>Title: {job.title}</p>
            <p>Company Name: {job.companyName}</p>
            <p>Salary: {job.salary}</p>
            <p>Location: {job.location}</p>
            <p>Description: {job.description}</p>

            <h2>Applicants:</h2>
            <ul>
                {job.applicants.map((applicant: any) => (
                    <li key={applicant.applicantUserId}>
                    <Link href={`/applicants/public-profile/${applicant.applicantUserId}`}>
                       <span style={{ cursor: 'pointer', marginRight: '10px' }}>{applicant.fullName}</span>
                    </Link>
                    <p>Mobile Number: {applicant.mobileNumber}</p>
                    <p>Email: {applicant.email}</p>
                    <p>Location: {applicant.location}</p>
                    <p>Resume Link: {applicant.resumeLink}</p>
                    <p>Applicant User ID: {applicant.applicantUserId}</p>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewJobDetails;
