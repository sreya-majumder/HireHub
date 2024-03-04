// api/recruiter/applicants.js

import { NextRequest, NextResponse } from 'next/server';
import {User} from '@/models/User'; // Assuming you have a User model defined somewhere
import { connect } from '@/database/mongo.config';

connect(); 

export async function GET(request: NextRequest) {
  try {
    // Fetch all users with role 'Applicant'
    const applicants = await User.find({ role: 'applicant' }, "name");

    return NextResponse.json(applicants, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching applicant profiles:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
