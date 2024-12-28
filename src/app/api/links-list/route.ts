import { buildQuery } from "@/lib/api/buildQuery";
import client, { dbConnect } from "@/lib/mongodb";
import { Sort } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // Manually extract and parse the query parameters
    const urlParams = request.nextUrl.searchParams;

    const search = urlParams.get("search") || "";
    const page = parseInt(urlParams.get("page") || "1", 10);
    const limit = parseInt(urlParams.get("limit") || "20", 10);
    const sortBy = urlParams.get("sortBy") || "shortId";
    const sortOrder = urlParams.get("sortOrder") || "asc";

    const parsedPage = parseInt(page.toString());
    const parsedLimit = parseInt(limit.toString());

    // Build the search query
    const query = buildQuery(search || "");

    // Define the sort object with a string key and a numeric value
    const sort: Sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const db = client.db();
    const linksCollection = db.collection("links");

    // Fetch the total count of links that match the search criteria
    const totalCount = await linksCollection.countDocuments(query);

    // Fetch the paginated and sorted links with 'created_at' field
    const links = await linksCollection
      .find(query)
      .skip((parsedPage - 1) * parsedLimit) // Paginate based on page and limit
      .limit(parsedLimit) // Limit the number of results per page
      .sort(sort) // Apply sorting
      .toArray();

    return NextResponse.json({
      totalCount,
      page: parsedPage,
      limit: parsedLimit,
      links: links,
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
