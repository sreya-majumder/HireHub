import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { registerSchema } from "@/validator/authValidationSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/emails/mailer";

interface UserPayload {
    email: "",
    password: "",
    city:"",
    country:"",
    number:"",
    age:"",
    password_confirmation: "",
    role : ""
  };


connect();
export async function POST(request: NextRequest) {
  try {
    const body: UserPayload = await request.json();
    vine.errorReporter = () => new ErrorReporter();
    const validator = vine.compile(registerSchema);
    const output = await validator.validate(body);
    try {
      const user = await User.findOne({ email: output.email });
      if (user) {
        return NextResponse.json(
          {
            status: 400,
            errors: {
              email: "Email is already used.",
            },
          },
          { status: 200 }
        );
      } else {
        // * To Hash the password
        const email = output.email
        const salt = bcrypt.genSaltSync(10);
        output.password = bcrypt.hashSync(output.password, salt);
        const savedUser = await User.create(output);
        const verificationCode = generateVerificationCode();
        savedUser.verificationCode = verificationCode
        await savedUser.save()
        // await sendVerificationEmail(output.email, verificationCode);
        
        return NextResponse.json(
          { status:200,
            user: savedUser, 
            msg: "User Created successfully!" 
          },
          { 
            status: 200 
          }
        );

        }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
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

const generateVerificationCode = () => {
    return Math.random().toString(36).substring(7);
};

