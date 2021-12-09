import { ThemeProvider } from "theme-ui";
import theme from "theme";
import Layout from "components/layout";
import { StickyProvider } from "contexts/app/app.provider";
import { VideoProvider } from "contexts/video/video.provider";
import BuildingPage from "components/building-page";
import SEO from "components/seo";

export default function BlogPage() {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <VideoProvider>
          <Layout isHome={false}>
            <SEO title="Blog - Lamda Ingeniería & Innovación" />
          </Layout>
        </VideoProvider>
      </StickyProvider>
    </ThemeProvider>
  );
}
