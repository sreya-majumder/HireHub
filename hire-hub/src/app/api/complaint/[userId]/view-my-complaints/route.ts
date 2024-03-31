import { NextRequest, NextResponse } from 'next/server';
import { Complaint } from '@/models/Complaint';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId  = params.userId;
        const complaints = await Complaint.find({ postedBy: userId });
        console.log(complaints)

        return NextResponse.json({ message: 'feedback retrieved successfully', complaints: complaints}, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving feedbacks:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}