"use client";

import { Stack, Typography } from "@mui/material";

import { GetLink } from "@/services";
import { notFound, redirect, RedirectType } from "next/navigation";
import dynamic from "next/dynamic";
import { LottiePlayer } from "@/components/LottiePlayer/LottiePlayer";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;
  const data = await GetLink({ shortId });
  if (!data) {
    notFound();
  }

  if (data) {
    // redirect(data.product_url, RedirectType.push);
  }

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
