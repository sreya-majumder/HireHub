import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User'; 
import { connect } from '@/database/mongo.config';

connect();

export async function POST(request: NextRequest, { params }: { params: { recruiterId: string, applicantId: string } }) {
    try {
        const { recruiterId, applicantId } = params;

        if (!recruiterId || typeof recruiterId !== 'string' || !applicantId || typeof applicantId !== 'string') {
            return NextResponse.json({ message: 'Invalid IDs' }, { status: 400 });
        }

        const recruiter = await User.findById(recruiterId);

        if (!recruiter) {
            return NextResponse.json({ message: 'Recruiter not found' }, { status: 404 });
        }

        const { recommendation } = await request.json();

        if (!recommendation || typeof recommendation !== 'string') {
            return NextResponse.json({ message: 'Recommendation should be a string' }, { status: 400 });
        }

        const applicant = await User.findById(applicantId);

        if (!applicant) {
            return NextResponse.json({ message: 'Applicant not found' }, { status: 404 });
        }

        applicant.recommendations.push({ recommendation, recruiterName: recruiter.name });

        await applicant.save();

        return NextResponse.json({ message: 'Recommendation added successfully', applicant }, { status: 200 });
    } catch (error: any) {
        console.error('Error adding recommendation:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
