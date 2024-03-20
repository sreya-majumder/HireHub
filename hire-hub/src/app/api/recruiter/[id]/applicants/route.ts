import { NextRequest, NextResponse } from 'next/server';
import {User} from '@/models/User'; 
import { connect } from '@/database/mongo.config';
import {Job} from '@/models/Job'

connect()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const recruiterId = params.id; 
    
    const job = await Job.findOne({ postedBy: recruiterId })

    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }
    const applicantIds = job.applicants.map((applicant: { applicantUserId: any; }) => applicant.applicantUserId);
    const applicants = await User.find({ _id: { $in: applicantIds } }, 'name');
    return NextResponse.json(applicants, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching applicants:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
