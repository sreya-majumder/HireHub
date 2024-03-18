import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, verificationCode } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ status: 404, error: "User not found." });
    }

    if (user.isVerified) {
      return NextResponse.json({ status: 400, error: "User is already verified." });
    }

    if (user.verificationCode !== verificationCode) {
      return NextResponse.json({ status: 400, error: "Invalid verification code." });
    }
    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      const savedUser = await user.save();
      return NextResponse.json({ status: 200, user: savedUser });
  
    }

   
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
