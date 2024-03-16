import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/database/mongo.config';
import { Job } from '@/models/Job';
import { User } from '@/models/User';

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const user = await User.findById(id);
    const userSkills = user?.skills.map((skill: { name: string }) => skill.name.toLowerCase().split(',')) || [];
    const flattenedSkills = userSkills.flat();

    const jobs = await Job.find();

    const jobsWithMatchingSkills = jobs.map(job => {
        const jobSkills = job.skills.map((skill: string) => skill.toLowerCase());
        const matchingSkills = jobSkills.filter((skill: any) => flattenedSkills.includes(skill));
        return { job, matchingSkills };
      });
      
    jobsWithMatchingSkills.sort((a, b) => b.matchingSkills.length - a.matchingSkills.length);

    const matchingJobs = jobsWithMatchingSkills.filter(item => item.matchingSkills.length > 0).map(item => item.job);
    
    const sortedJobs = [...matchingJobs];

    return NextResponse.json(sortedJobs, { status: 200 });

  }catch (error: any) {
    console.error('Error fetching existing jobs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}