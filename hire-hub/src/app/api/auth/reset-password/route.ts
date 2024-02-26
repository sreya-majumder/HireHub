import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import Env from "@/config/env";
import { connect } from "@/database/mongo.config";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  const payload: ResetPasswordPayload = await request.json();
  console.log(Env.SECRET_KEY)
  
  // * Decrypt string
  const crypter = new Cryptr(Env.SECRET_KEY);
  const email = crypter.decrypt(payload.email);


  const user = await User.findOne({
    email: email,
    reset_password_token: payload.signature,
  });
  console.log("backend")
  console.log(email,payload.signature)
  console.log(user)
  if (user == null || user == undefined) {
    return NextResponse.json({
      status: 400,
      message: "Reset url is not correct. pls double check it .",
    });
  }
  console.log(user)

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(payload.password, salt);
  user.password_reset_token = null;
  await user.save();

  return NextResponse.json({
    status: 200,
    message: "Password changed successfully. please login with new password.",
  });
}
