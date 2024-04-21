import { NextRequest, NextResponse } from 'next/server';
import { Job } from '@/models/Job';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId  = params.userId;
        const jobs = await Job.find({ postedBy: userId });
        console.log(jobs)

        return NextResponse.json({ message: 'Jobs retrieved successfully', jobs: jobs}, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving jobs:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}