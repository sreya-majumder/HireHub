import { NextRequest, NextResponse } from 'next/server';
import { Complaint } from '@/models/Complaint';
import { User } from '@/models/User'; 
import { connect } from '@/database/mongo.config';

connect();

export async function GET(request: NextRequest) {
    try {
        const complaints = await Complaint.find();
        console.log(complaints)

        return NextResponse.json({ message: 'feedback retrieved successfully', complaints: complaints}, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving feedbacks:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}