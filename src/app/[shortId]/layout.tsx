import { GetLink } from "@/services";
import Head from "next/head";
import React from "react";

interface LayoutProps {
  params: Promise<{ shortId: string }>;

  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;

  if (!shortId) {
    return {
      title: "Redirect - Product Not Found",
      description: "The product could not be found.",
    };
  }

  const data = await GetLink({ shortId });

  if (!data) {
    return {
      title: "Redirect - Product Not Found",
      description: "No product details available.",
    };
  }

  return {
    title: `${data.product_name}`,
    description: `${data.product_name} تونوکه | فروشگاه تخصصی لباس زیر`,
    keywords: `product, ${data.product_name}`,
    openGraph: {
      title: `${data.product_name}`,
      description: data.product_name || "Explore this product.",
      url: data.original_link,
      images: [{ url: data.image_url }],
      type: "website",
    },
  };
}

const PageLayout = async ({ params, children }: LayoutProps) => {
  return <div>{children}</div>;
};
export default PageLayout;
