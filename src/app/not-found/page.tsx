"use client";

import { Button, Stack, Typography } from "@mui/material";
import LottiePlayer from "react-lottie";
import Animation from "@/lotties/searching.json";
import Link from "next/link";
export default function NotFound() {
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
        <Typography variant="h5">!صفحه مورد نظر پیدا نشد</Typography>
        <Button
          LinkComponent={Link}
          variant="contained"
          color="primary"
          fullWidth
          href={process.env.ORIGINAL_DOMAIN}
        >
          بازگشت به خانه
        </Button>
      </Stack>
    </Stack>
  );
}
