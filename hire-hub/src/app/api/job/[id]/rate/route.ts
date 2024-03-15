import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/database/mongo.config';
import { Job } from '@/models/Job';

connect();
  
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id;
    const reqBody = await request.json();
    const { rating } = reqBody;

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    // Update the job's rating
    const newTotalRatings = job.totalRatings ? job.totalRatings + 1 : 1;
    const newAverageRating = ((job.rating * job.totalRatings) + rating) / newTotalRatings;

    job.rating = newAverageRating;
    job.totalRatings = newTotalRatings;
    await job.save();

    return NextResponse.json({ message: 'Job rating updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating job rating:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
