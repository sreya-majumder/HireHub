import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User';
import { Complaint } from '@/models/Complaint'; 
import { connect } from '@/database/mongo.config';

connect();

export async function POST(request: NextRequest, { params }: { params: { userId: string} }) {
    try {
        const userId = params.userId; 

        const { content } = await request.json();

        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ message: 'Invalid IDs' }, { status: 400 });
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const newComplaint = new Complaint({
            content,
            postedBy: userId, 
            comments: [] 
        });

        await newComplaint.save();

        return NextResponse.json({ message: 'Feedback posted successfully', Complaint: newComplaint }, { status: 200 });
    } catch (error: any) {
        console.error('Error posting blog:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
