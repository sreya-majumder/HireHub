import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog';
import { User } from '@/models/User'; 
import { connect } from '@/database/mongo.config';

connect();

export async function GET(request: NextRequest, { params }: { params: { commentBy: string, blogId: string } }) {
    try {
        const { commentBy, blogId } = params;
        
        // Retrieve the blog using its ID
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        const blogText = blog.blogText;

        const comments = blog.comments;

        const userNamePromises = comments.map(async (comment: { commentBy: any; }) => {
            const user = await User.findById(comment.commentBy);
            return user ? user.name : null;
        });

        const userNames = await Promise.all(userNamePromises);

        const commentsWithUserNames = comments.map((comment: any, index: any) => ({
            ...comment.toJSON(),
            userName: userNames[index]
        }));

        return NextResponse.json({ message: 'Comments retrieved successfully', blogText : blogText, comments: commentsWithUserNames }, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving blog and comments:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
