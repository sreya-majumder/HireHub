import { User } from "../../../../models/User";
import { connect } from "@/database/mongo.config";

export async function POST(request: Request) {
  await connect();
  const payload = await request.json();

  try {
    const user = await User.findById(payload.id);

    if (payload.city && payload.country) {
      
      const filter = { _id: payload.id };
      const updateDoc = {
        $set: {city :payload.city, country: payload.country} 
      };
   
      await user.updateOne(filter, updateDoc);
      // await user.updateOne({country :payload.country});
      await user.save();
    }

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
