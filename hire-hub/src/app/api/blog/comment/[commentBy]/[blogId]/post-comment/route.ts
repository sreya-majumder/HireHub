import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog';
import { connect } from '@/database/mongo.config';

connect();

export async function POST(request: NextRequest, { params }: { params: { commentBy: string, blogId: string } }) {
    try {
        const { commentText } = await request.json();
        const { commentBy, blogId } = params;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        blog.comments.push({ commentBy, commentText });

        await blog.save();

        return NextResponse.json({ message: 'Comment added successfully', blog }, { status: 200 });
    } catch (error: any) {
        console.error('Error adding comment:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 