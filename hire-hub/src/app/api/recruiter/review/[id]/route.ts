import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";

export async function POST(request: Request) {
    await connect();
    const payload = await request.json();
  try {
    const user = await User.findById(payload.id);
    await user.recruiterReview.push({
        name: payload.name,
        review: payload.review,
      });
      await user.save();
      return Response.json({
        status: 200,
        data: user,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
        status: 400,
        error: error,
    });
    }
}