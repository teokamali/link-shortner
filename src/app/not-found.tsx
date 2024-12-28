"use client";

import { Button, Stack, Typography } from "@mui/material";

import Animation from "@/lotties/searching.json";
import Link from "next/link";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("react-lottie"), { ssr: false });

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
