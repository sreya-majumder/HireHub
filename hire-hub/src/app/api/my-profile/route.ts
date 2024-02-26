import { User } from "../../../models/User";

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const user = await User.findById(payload.id);

    return Response.json({
      status: 200,
      data: user,
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
