import { NextRequest, NextResponse } from 'next/server';
import { Job } from '@/models/Job';
import { connect } from '@/database/mongo.config';

connect()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const jobId = params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Job retrieved successfully', job }, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving job:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
