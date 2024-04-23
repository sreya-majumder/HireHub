import { NextRequest, NextResponse } from 'next/server';
import { Blog } from '@/models/Blog';
import { User } from '@/models/User'; 
import { connect } from '@/database/mongo.config';

connect();

export async function GET(request: NextRequest,{ params }: { params: { userId: string} }) {
    try {
        const userId = params.userId; 
        const blogs = await Blog.find();

        const userNamePromises = blogs.map(async (blog) => {
            const user = await User.findById(blog.postedBy);
            return user ? user.name : null;
        });

        const userNames = await Promise.all(userNamePromises);

        const blogsWithUserNames = blogs.map((blog, index) => ({
            ...blog.toJSON(),
            userName: userNames[index]
        }));

        return NextResponse.json({ message: 'Blogs retrieved successfully', blogs: blogsWithUserNames }, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving blogs:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
