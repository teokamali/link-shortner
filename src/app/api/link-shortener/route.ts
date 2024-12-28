import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb"; // Import the MongoDB client
import { generateShortId } from "@/lib/api/randomId";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const longUrl = request.nextUrl.searchParams.get("url");
    if (!longUrl) {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }
    const db = client.db(); // Access the database
    const linksCollection = db.collection("links"); // Access the "links" collection

    // Generate a shortId and check for uniqueness
    let shortId = generateShortId();

    // Check if the shortId already exists in the database
    let existingLink = await linksCollection.findOne({ shortId });
    while (existingLink) {
      // If the shortId exists, generate a new one
      shortId = generateShortId();
      existingLink = await linksCollection.findOne({ shortId });
    }

    // Insert the new link with the unique shortId into the database
    await linksCollection.insertOne({ shortId, longUrl });

    return NextResponse.json(
      { shortUrl: `${process.env.SHORT_DOMAIN}/${shortId}` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
