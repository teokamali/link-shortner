"use client";

import { GetLink } from "@/services";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { redirect, RedirectType, useParams } from "next/navigation";
import { useEffect } from "react";
import LottiePlayer from "react-lottie";
import Animation from "@/lotties/searching.json";
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

  return (
    <Stack
      direction={"row"}
      width={"100%"}
      height={"80vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack gap={2} alignItems={"center"}>
        <LottiePlayer
          width={300}
          height={300}
          options={{
            animationData: Animation,
            loop: true,
            autoplay: true,
          }}
        />
        <Typography variant="h5">در حال انتقال به لینک...</Typography>
      </Stack>
    </Stack>
  );
}
