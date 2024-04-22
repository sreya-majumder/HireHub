import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User';
import { connect } from '@/database/mongo.config';

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid Applicant ID' }, { status: 400 });
    }

    const applicant = await User.findById(id);

    if (!applicant) {
      return NextResponse.json({ message: 'Applicant not found' }, { status: 404 });
    }
    console.log(applicant)
    return NextResponse.json({ message: 'Applicant retrieved successfully', applicant }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving applicant:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


