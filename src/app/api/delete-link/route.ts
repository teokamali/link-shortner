import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb"; // Import the MongoDB client
import { ObjectId } from "mongodb";
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = request.nextUrl;
    const linkId = searchParams.get("_id");

    if (!linkId) {
      return NextResponse.json(
        { error: "Link ID is required." },
        { status: 400 }
      );
    }

    const db = client.db();
    const linksCollection = db.collection("links");

    // Delete the link with the given _id
    const result = await linksCollection.deleteOne({
      _id: new ObjectId(linkId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Link not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Link deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
