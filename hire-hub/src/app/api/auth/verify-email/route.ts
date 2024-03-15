import {connect} from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/User";

connect()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const existingUser = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!existingUser) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
    
        existingUser.isVerified = true;
        existingUser.verifyToken = undefined;
        existingUser.verifyTokenExpiry = undefined;
        await existingUser.save();
        
        return NextResponse.json({
            message: "Successfully Verified Email",
            success: true
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}