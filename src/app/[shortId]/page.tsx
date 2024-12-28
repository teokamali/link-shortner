"use client";
import { GetLink } from "@/services/controllers/getLink.service";
import { useQuery } from "@tanstack/react-query";
import { redirect, RedirectType, useParams } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const params = useParams();
  const shortId = params.shortId as string;

  const { data } = useQuery({
    queryKey: ["get-link"],
    queryFn: () => GetLink({ shortId }),
  });
  useEffect(() => {
    if (data) {
      redirect(data.longUrl, RedirectType.replace);
    }

    return () => {};
  }, [data]);

  return <>در حال انتقال به صفحه....</>;
}
