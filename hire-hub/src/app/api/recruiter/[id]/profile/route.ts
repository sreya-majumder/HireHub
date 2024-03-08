import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User';
import { connect } from '@/database/mongo.config';

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid recruiter ID' }, { status: 400 });
    }

    const recruiter = await User.findById(id, 'name email city country number');

    if (!recruiter) {
      return NextResponse.json({ message: 'Recruiter not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Recruiter retrieved successfully', recruiter }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving recruiter:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


