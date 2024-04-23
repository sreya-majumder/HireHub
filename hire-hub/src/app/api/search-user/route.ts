import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/database/mongo.config';
import { User } from '@/models/User';

connect();

export async function GET(request: NextRequest, res: NextResponse) {
  try {

    // setting search params
    const urlSearchParams = new URLSearchParams(request.nextUrl.search);
    const search = urlSearchParams.get('search');
    
    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Case-insensitive search by name
          { email: { $regex: search, $options: 'i' } }, // Case-insensitive search by email
        ],
      });

      return NextResponse.json(users, { status: 200 });
    } else {
      // Handle case when no search query is provided
      return NextResponse.json({ message: 'No search query provided' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error searching users:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}