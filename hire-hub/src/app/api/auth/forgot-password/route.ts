import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import Env from "@/config/env";
import { render } from "@react-email/render";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import nodemailer from "nodemailer";
import { connect } from "@/database/mongo.config";

connect();

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a773be3ee0342f",
    pass: "3fde9204c7dddd"
  }
});

export async function POST(request: NextRequest) {
  const payload: ResetPasswordPayload = await request.json();

  // * Check user email first
  const user = await User.findOne({ email: payload.email });
  if (user == null) {
    return NextResponse.json({
      status: 400,
      errors: {
        email: "No user found with this email.",
      },
    });
  }

  //   * Generate random string
  const randomStr = cryptoRandomString({
    length: 64,
    type: "alphanumeric",
  });

  user.reset_password_token = randomStr;
  await user.save();

  // * Encrypt user email
  const crypt = new Cryptr(Env.SECRET_KEY);
  const encryptedEmail = crypt.encrypt(user.email);
  
  const url = `${Env.APP_URL}/reset-password/${encryptedEmail}?signature=${user.reset_password_token}`;
  
  try {
    const html = render(
      ForgotPasswordEmail({
        params: {
          name: user.name,
          url: url,
        },
      })
    );

    // * Send email to user
    await transporter.sendMail({
      from: "sm@gmail.com",
      to: payload.email,
      subject: "Reset Your Password",
      html: html,
    });

    return NextResponse.json({
      status: 200,
      message: "Email sent successfully. Please check your email.",
    });
  } catch (error) {
    console.log("the error is", error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong. Please try again!",
    });
  }
}

