import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const jobId = params.id;
    const job = await User.findById(jobId);

    if (job) {
      return Response.json(
        {
          data: {
            _id: job._id.toHexString(), // Include the _id in the response data
            ...job.toObject(), // Include other fields from the job object
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return Response.json(
        {
          errors: {
            message: "Could not find job with the given id",
          },
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        status: 400,
        errors: {
          message: "Could not find job with the given id",
        },
      },
      { status: 400 }
    );
  }
}