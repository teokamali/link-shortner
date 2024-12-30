"use client";
import React from "react";
import Lottie from "react-lottie";
import Animation from "@/lotties/searching.json";

export const LottiePlayer = () => {
  return (
    <Lottie
      width={300}
      height={300}
      options={{
        animationData: Animation,
        loop: true,
        autoplay: true,
      }}
    />
  );
};
