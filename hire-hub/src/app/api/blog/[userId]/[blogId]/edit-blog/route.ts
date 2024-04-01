import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog'; 
import { User } from '@/models/User';
import { connect } from '@/database/mongo.config';

connect();

export async function PUT(request: NextRequest, { params }: { params: { userId: string, blogId: string } }) {
    try {
        const { userId, blogId } = params;

        if (!userId || typeof userId !== 'string' || !blogId || typeof blogId !== 'string') {
            return NextResponse.json({ message: 'Invalid User ID or Blog Id' }, { status: 400 });
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const { blogTopic, blogText } = await request.json();

        if (!blogTopic && !blogText) {
            return NextResponse.json({ message: 'No updates provided' }, { status: 400 });
        }

        const updatedFields: any = {};

        if (blogTopic) {
            updatedFields.blogTopic = blogTopic;
        }

        if (blogText) {
            updatedFields.blogText = blogText;
        }

        const blog = await Blog.findByIdAndUpdate(blogId, updatedFields, { new: true });

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog updated successfully', blog }, { status: 200 });

    } catch (error: any) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
