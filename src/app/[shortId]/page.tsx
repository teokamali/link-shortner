"use client";
import { dbConnect } from "@/lib/mongodb";
import linkModel from "@/models/link.model";
import { useParams } from "next/navigation";

export default function RedirectPage() {
  const params = useParams();
  const { shortId } = params;
  const getItem = async () => {
    await dbConnect();
    const link = await linkModel.findOne({ shortId });
    return link;
  };
  console.log(getItem());
  return null;
}
