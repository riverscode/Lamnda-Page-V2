import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "../contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Modal from "components/modal";
import Banner from "../sections/home/banner";
import KeyFeature from "../sections/home/key-feature";
import ServiceSection from "../sections/service-section";
import Feature from "../sections/feature";
import Blog from "../sections/home/blog";
import WorkFlow from "../sections/workflow";
import Package from "../sections/package";
import TeamSection from "../sections/team-section";
import TestimonialCard from "../sections/home/testimonial";
import BlogSection from "../sections/blog-section";
import Subscribe from "../sections/subscribe";
import Course from "../sections/home/course";
import { VideoProvider } from "contexts/video/video.provider";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <VideoProvider>
          <Layout isHome={true}>
            <SEO title="Lamda Ingeniería & Innovación" />
            <Banner />
            <KeyFeature />
            <Course />
            <Blog />
            <TestimonialCard />
            {/* <ServiceSection /> */}
            {/* <Feature /> */}
            {/* <Subscribe /> */}
            {/* <WorkFlow /> */}
            {/* <Package /> */}
            {/* <TeamSection /> */}
            {/* <BlogSection /> */}
            <Modal />
          </Layout>
        </VideoProvider>
      </StickyProvider>
    </ThemeProvider>
  );
}
