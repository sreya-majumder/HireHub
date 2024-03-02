import { Job } from "../../../models/Job";

export async function POST(request: Request) {
  const payload = await request.json();

  const { title, companyName, salary, location, description } = payload;

  console.log(title, companyName, salary, location, description);

  try {
    const job = await Job.create({
      title: title,
      companyName: companyName,
      salary: salary,
      location: location,
      description: description,
    });

    return Response.json(
      {
        status: 200,
        data: {
          _id: job._id.toHexString(), // Include the _id in the response data
          ...job.toObject(), // Include other fields from the job object
        },
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
