import { User } from "../../../../models/User";
import { Blog } from "@/models/Blog";

import { connect } from "@/database/mongo.config";

export async function POST(request: Request) {
  
  try {
    await connect();
  const payload = await request.json();

  const userId = payload.id; 
  console.log('user is '+payload.userId)
    await Blog.deleteMany( {postedBy:userId } );

    await User.deleteOne({_id : userId})

    return Response.json({ message: 'account deleted successfully' }, { status: 200 });
 
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 400,
      error: error,
    });
  }
}