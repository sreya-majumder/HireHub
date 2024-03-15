import { connect } from "@/database/mongo.config";
import { Job } from "@/models/Job";

export async function POST(request: Request) {
  await connect();
  const payload = await request.json();

  const {
    fullName,
    mobileNumber,
    email,
    location,
    resumeLink,
    jobId,
    applicantUserId,
    
  } = payload;

  try {
    const job = await Job.findById(jobId);

    await job.applicants.push({
      fullName: fullName,
      mobileNumber: mobileNumber,
      email: email,
      location: location,
      resumeLink: resumeLink,
      applicantUserId: applicantUserId,
    });

    await job.save();

    return Response.json(
      {
        status: 200,
        data: job,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        status: 400,
        errors: {
          message: "Could not create job with the given data",
          error: error,
        },
      },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
