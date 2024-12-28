import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb"; // Import the MongoDB client

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get the shortId from the URL query parameters
    const shortId = request.nextUrl.searchParams.get("shortId");
    if (!shortId) {
      return NextResponse.json(
        { error: "shortId is required." },
        { status: 400 }
      );
    }

    const db = client.db();
    const linksCollection = db.collection("links");

    // Query the database for the link with the provided shortId
    const link = await linksCollection.findOne({ shortId });

    if (!link) {
      return NextResponse.json({ error: "Link not found." }, { status: 404 });
    }

    // Return the longUrl of the link
    return NextResponse.json({ longUrl: link.longUrl });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
