import { connect } from "@/database/mongo.config";
import { Job } from "@/models/Job";

export async function GET(request: Request) {
  try {
    await connect();

    try {
        const job = await Job.find({});
    
        return Response.json({
          status: 200,
          data: job,
        });
      } catch (error) {
        return Response.json({
          status: 400,
          errors: {
            email: "No user found with this email.",
          },
        });
      }
}
}