import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId  = params.userId;
        const blogs = await Blog.find({ postedBy: userId });
        console.log(blogs)

        return NextResponse.json({ message: 'Blogs retrieved successfully', blogs: blogs}, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving blogs:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}