import { GetLink } from "@/services";
import React, { PropsWithChildren } from "react";

interface Page extends PropsWithChildren {
  params: { shortId: string };
}

export async function generateMetadata({ params }: Page) {
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
    title: `Product - ${data.product_title}`,
    description: `${data.product_title} تونوکه | فروشگاه تخصصی لباس زیر`,
    keywords: `product, ${data.product_title}`,
    openGraph: {
      title: `Product - ${data.product_title}`,
      description: data.product_title || "Explore this product.",
      url: data.product_url,
      images: [{ url: data.product_image_url }],
      type: "website", // Changed to 'website' to fix the invalid OpenGraph type error
    },
  };
}

const PageLayout = async ({ params, children }: Page) => {
  return <div>{children}</div>;
};
export default PageLayout;
