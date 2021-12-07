import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "../contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Modal from "components/modal";
import Banner from "../sections/banner";
import KeyFeature from "../sections/key-feature";
import ServiceSection from "../sections/service-section";
import Feature from "../sections/feature";
import Blog from "../sections/blog";
import WorkFlow from "../sections/workflow";
import Package from "../sections/package";
import TeamSection from "../sections/team-section";
import TestimonialCard from "../sections/testimonial";
import BlogSection from "../sections/blog-section";
import Subscribe from "../sections/subscribe";
import Course from "../sections/course";
import { VideoProvider } from "contexts/video/video.provider";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <VideoProvider>
          <Layout>
            <SEO title="Lamda Ingeniería & Innovación" />
            <Banner />
            <KeyFeature />
            {/* <ServiceSection /> */}
            {/* <Feature /> */}
            <Course />
            <Blog />
            <Subscribe />
            {/* <WorkFlow /> */}
            {/* <Package /> */}
            {/* <TeamSection /> */}
            <TestimonialCard />
            {/* <BlogSection /> */}
            <Modal />
          </Layout>
        </VideoProvider>
      </StickyProvider>
    </ThemeProvider>
  );
}
