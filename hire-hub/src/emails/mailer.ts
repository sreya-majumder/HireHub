// import nodemailer from 'nodemailer';
// import {User} from "@/models/User";
// import bcryptjs from 'bcryptjs';


// export const sendEmail = async({email, emailType, userId}:any) => {
//     try {
        
//         const hashedToken = await bcryptjs.hash(userId.toString(), 10)

//         if (emailType === "VERIFY") {
//             await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
//         }

//         var transport = nodemailer.createTransport({
//             host: "sandbox.smtp.mailtrap.io",
//             port: 2525,
//             auth: {
//               user: "a773be3ee0342f",
//               pass: "3fde9204c7dddd"
//             }
//         });

//         const mailOptions = {
//             from: 'sm@gmail.com',
//             to: email,
//             subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//             html: `<p>Click <a href="${process.env.APP_URL}/verify-email/?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
//             or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
//             </p>`
//         };

//         const mailresponse = await transport.sendMail
//         (mailOptions);
//         return mailresponse;

//     } catch (error:any) {
//         throw new Error(error.message);
//     }
// }

import nodemailer from "nodemailer";

// Function to send verification email
export async function sendVerificationEmail(email: string, verificationCode: string) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a773be3ee0342f",
        pass: "3fde9204c7dddd"
    }
  });

  // Define email options
  const mailOptions = {
    from: "jobify@gmail.com",
    to: email,
    subject: "Verify Your Email",
    html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
