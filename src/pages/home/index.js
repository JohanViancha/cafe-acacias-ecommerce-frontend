"use client";

import Seo from "@/components/Shared/Seo";
import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import ProductsSection from "@/components/Home/ProductSection";
import StorySection from "@/components/Home/StorySection";
import ProcessSection from "@/components/Home/ProcessSection";
import Newsletter from "@/components/Home/Newsletter";
import BasicLayout from "@/layouts/BasicLayout";

export default function HomePage() {
  return (
    <>
      <Seo />
      <BasicLayout>
        <Hero />
        <Features />
        <ProductsSection />
        <StorySection />
        <ProcessSection />
        <Newsletter />
      </BasicLayout>
    </>
  );
}
