import { ThemeProvider } from "theme-ui";
import theme from "theme";
import Layout from "components/layout";
import { StickyProvider } from "contexts/app/app.provider";
import { VideoProvider } from "contexts/video/video.provider";
import SEO from "components/seo"

export default function CoursePage() {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <VideoProvider>
          <Layout isHome={false}>
            <SEO title="Cursos - Lamda Ingeniería & Innovación" />
          </Layout>
        </VideoProvider>
      </StickyProvider>
    </ThemeProvider>
  );
}
