import { User } from "../../../../models/User";

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const user = await User.findById(payload.id);
    console.log("User is ", user);

    console.log(payload);

    if (payload.skillName) {
      // add the skills to the user
      await user.skills.push({
        name: payload.skillName,
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
