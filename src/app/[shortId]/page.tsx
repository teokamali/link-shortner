"use client";
import { GetLink } from "@/services";
import { Stack, Typography } from "@mui/material";
import { LottiePlayer } from "@/components/LottiePlayer/LottiePlayer";
import { notFound, redirect, RedirectType, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
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
      redirect(data.product_url, RedirectType.replace);
    }
    return () => {};
  }, [data]);

  return (
    <Stack
      direction={"row"}
      width={"100%"}
      height={"80vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack gap={2} alignItems={"center"}>
        <LottiePlayer />
        <Typography variant="h5">در حال انتقال به لینک...</Typography>
      </Stack>
    </Stack>
  );
}
