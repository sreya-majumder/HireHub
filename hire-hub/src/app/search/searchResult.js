"use server"
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";

connect()
export default async function searchResult(str){

    let searchTerm = `${str}`

    const convertFirstLetter = (text) => {
        const convert = text.replace(/(^\w{1})|(\.\s*\w{1})/g, (match)=>match.toUpperCase())
        return convert
    }

    const searchTermFirst = convertFirstLetter(searchTerm)

    let results = await User.find({
        $or: [
            {
                name: {$regex: searchTerm}
            },
            {
                name: {$regex: searchTermFirst}
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