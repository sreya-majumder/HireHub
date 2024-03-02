import { User } from "../../../../models/User";

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const user = await User.findById(payload.id);

    if (payload.role && payload.company) {
      // add the projects to the user
      await user.job.push({
        role: payload.role,
        company: payload.company,
        description: payload.description,
      });
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