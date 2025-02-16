import { connectToDB } from "@/utils/database";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { params } = context;
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ success: false, message: "User ID is missing" }, { status: 400 });
    }

    await connectToDB();

    const posts = await Post.find({ creator: id }).lean();

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
