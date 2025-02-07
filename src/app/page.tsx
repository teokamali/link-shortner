import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  return redirect(process.env.ORIGINAL_DOMAIN || "https://tunuke.com");
};

export default Page;
