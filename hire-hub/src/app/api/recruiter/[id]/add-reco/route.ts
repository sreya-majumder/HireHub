
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User'; 
import { connect } from '@/database/mongo.config';

connect();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = params.id;

        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const user = await User.findById(userId);
        console.log(user)

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const { recommendation, recruiterName } = await request.json();

        if (!recommendation || typeof recommendation !== 'string' || !recruiterName || typeof recruiterName !== 'string') {
            return NextResponse.json({ message: 'Recommendation and recruiter name should be strings' }, { status: 400 });
        }

        user.recommendations.push({ recommendation, recruiterName });

        await user.save();

        return NextResponse.json({ message: 'Recommendation added successfully', user }, { status: 200 });
    } catch (error: any) {
        console.error('Error adding recommendation:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
