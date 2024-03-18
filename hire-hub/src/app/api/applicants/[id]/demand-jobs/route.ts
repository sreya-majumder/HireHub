import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/database/mongo.config';
import { Job } from '@/models/Job';

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      const jobs = await Job.aggregate([
        {
          $match: { "applicants.0": { $exists: true } }
        },
        {
          $addFields: {
            numApplicants: { $size: "$applicants" }
          }
        },
        {
          $sort: { numApplicants: -1, createdAt: -1 }
        }
      ]);
  
      return NextResponse.json(jobs, { status: 200 });
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
  
