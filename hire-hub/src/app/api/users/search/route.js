import users from "@/app/model/userModel";
import {connect} from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect()

export const POST = async (req, res) => {
  const { searchTerm } = await req.json();
  const convertToLowerCase = (text) => {
    const convertedText = text.replace(/[A-Z]/g, (match) =>
      match.toLowerCase()
    );
    return convertedText;
  };
  const searchTermLower = convertToLowerCase(searchTerm);

  const convertFirstLetterToCapital = (text) => {
    const convertedText = text.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
      match.toUpperCase()
    );
    return convertedText;
  };
  const searchTermFirst = convertFirstLetterToCapital(searchTerm);
  let result = await users.find({
    $or: [
      {
        username: { $regex: searchTermLower },
      },
      {
        username: { $regex: searchTerm },
      },
      {
        username: { $regex: searchTermFirst },
      },
    ],
  });
  return NextResponse.json(result);
};
