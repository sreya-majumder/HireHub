import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import ErrorReporter from "@/validator/ErrorReporter";
import { loginSchema } from "@/validator/authValidationSchema";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";



connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    vine.errorReporter = () => new ErrorReporter();
    const validator = vine.compile(loginSchema);
    const output = await validator.validate(body);
    const user = await User.findOne({ email: output.email });
    if (user) {
      const checkPassword = bcrypt.compareSync(output.password!, user.password);
      console.info("The checkpassword is", checkPassword);
      if (checkPassword) {
        console.log(user)
        return NextResponse.json(
          { status: 200, message: "Logged in successfully!", user },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          status: 400,
          errors: {
            password: "Password is Incorrect. Please check your password.",
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Couldn't found any user with this email. Please Check your email",
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}
