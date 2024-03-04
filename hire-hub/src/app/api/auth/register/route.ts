// import {connect} from "@/database/mongo.config";
// import {User} from "@/models/User";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

// connect()

// export async function POST(request: NextRequest, response: NextResponse){
//     try {
//         const reqBody = await request.json()
//         const {name, email, password, password_confirmation, city, country, number, age} = reqBody
 
//         if (!name || !email || !password || password_confirmation ||!city || !country || !number || !age) {
//             return NextResponse.json({ message: 'Please provide all required fields.' }, { status: 400 });
//         }
    
//         const existingCandidate = await User.findOne({email})

//         if(existingCandidate){
//             return NextResponse.json({error: "Candidate already exists"}, {status: 400})
//         }

//         const salt = await bcryptjs.genSalt(10)
//         const hashedPassword = await bcryptjs.hash(password, salt)

//         const newUser = new User({
//           name,
//           email,
//           password: hashedPassword,
//           city,
//           country,
//           number,
//           age
//         })

//         const savedCandidate = await newUser.save()
        

//         return NextResponse.json({
//             message: "Candidate created successfully",
//             success: true,
//             savedCandidate
//         })
        
//     } catch (error: any) {
//         return NextResponse.json({error: error.message}, {status: 500})

//     }
// }



import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { registerSchema } from "@/validator/authValidationSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";

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
        const salt = bcrypt.genSaltSync(10);
        output.password = bcrypt.hashSync(output.password, salt);
        await User.create(output);
        return NextResponse.json(
          { status: 200, msg: "User Created successfully!" },
          { status: 200 }
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
