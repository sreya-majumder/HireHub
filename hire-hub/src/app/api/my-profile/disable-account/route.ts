import { User } from "../../../../models/User";
import { connect } from "@/database/mongo.config";

export async function POST(request: Request) {
  await connect();
  const payload = await request.json();

  try {
      const user = await User.updateOne(
        { _id: payload.id },
        { $set: { disabled: true } }
      );
 

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
