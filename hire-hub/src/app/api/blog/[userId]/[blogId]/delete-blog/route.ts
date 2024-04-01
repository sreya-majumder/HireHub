import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog';
import { connect } from '@/database/mongo.config';

connect();

export async function DELETE(request: NextRequest, { params }: { params: { userId: string, blogId: string } }) {
    try {
        const { userId, blogId } = params;

        if (!userId || typeof userId !== 'string' || !blogId || typeof blogId !== 'string') {
            return NextResponse.json({ message: 'Invalid User ID or Blog ID' }, { status: 400 });
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
