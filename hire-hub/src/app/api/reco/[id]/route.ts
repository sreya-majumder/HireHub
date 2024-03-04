import { NextRequest, NextResponse } from 'next/server';
import {User} from '@/models/User';
import { connect } from '@/database/mongo.config';

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = params.id;

        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Recommendation retrieved successfully', recommendations: user.recommendations }, { status: 200 });

    } catch (error: any) {
        console.error('Error retrieving recommendations:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
