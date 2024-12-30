"use client";

import { Stack, Typography } from "@mui/material";
import { GetLink } from "@/services";
import { useParams, useRouter } from "next/navigation";
import { LottiePlayer } from "@/components/LottiePlayer/LottiePlayer";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function RedirectPage() {
  const params = useParams();
  const { shortId } = params;
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["get-link"],
    queryFn: () => GetLink({ shortId: shortId as string }),
  });

  // useEffect(() => {
  //   if (data) {
  //     setTimeout(() => {
  //       router.push(data.product_url);
  //     }, 3000);
  //   }

  //   return () => {};
  // }, [data]);

  return (
    <>
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
    </>
  );
}
