import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog';
import { connect } from '@/database/mongo.config';

connect();

export async function GET(request: NextRequest, { params }: { params: { userId: string, blogId: string } }) {
    try {
        const { userId, blogId } = params;
        const blog = await Blog.findById(blogId);
        console.log(blog)

        return NextResponse.json({ message: 'Blog retrieved successfully', blog: blog}, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving blogs:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}