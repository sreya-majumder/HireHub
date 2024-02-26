"use server"
import {connect} from "../../dbConfig/dbConfig";
import mongoose from "mongoose"
import users from "../../models/userModel"

connect()
export default async function searchResult(str){
    // await mongoose.connect("mongodb://127.0.0.1:27017/nextProducts", {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })

    let searchTerm = `${str}`

    const convertFirstLetter = (text) => {
        const convert = text.replace(/(^\w{1})|(\.\s*\w{1})/g, (match)=>match.toUpperCase())
        return convert
    }

    const searchTermFirst = convertFirstLetter(searchTerm)

    let results = await users.find({
        $or: [
            {
                username: {$regex: searchTerm}
            },
            {
                username: {$regex: searchTermFirst}
            },
            {
                city: {$regex: searchTerm}
            },
            {
                city: {$regex: searchTermFirst}
            }
        ]
    })

    return results
}