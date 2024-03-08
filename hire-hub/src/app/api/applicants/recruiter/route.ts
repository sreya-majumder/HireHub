import { NextRequest, NextResponse } from 'next/server';
import {User} from '@/models/User'; 
import { connect } from '@/database/mongo.config';

connect(); 

export async function GET(request: NextRequest) {
  try {
    const recruiters = await User.find({ role: 'recruiter' }, "name");

    return NextResponse.json(recruiters, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching recruiter profiles:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
