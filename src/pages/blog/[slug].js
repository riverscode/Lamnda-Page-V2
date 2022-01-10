/** @jsx jsx */
import { jsx, Container, Box, Image } from "theme-ui";
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import highlight from "highlight.js";
import Layout from "components/layout";
import { FacebookProvider, Comments } from "react-facebook";
import SEO from "components/seo";

export default function PostPage({
  frontmatter: { title, date, cover_image, excerpt },
  slug,
  content,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Layout isHome={false}>
        <SEO title={`Blog Lambda | ${title}`} previewImage={`https://lambda.com.pe${cover_image}`} description={excerpt}/>
        <Container sx={styles.container}>
          <Box className="card card-page">
            <Image src={cover_image} alt="" css={{ width: "100%" }} />
            <h1 className="post-title">{title}</h1>
            <p className="post-date">Publicado en {date}</p>
            <Box className="post-body">
              <Box
                dangerouslySetInnerHTML={{
                  __html: marked(content, {
                    highlight(md) {
                      return highlight.highlightAuto(md).value;
                    },
                  }),
                }}
              ></Box>
            </Box>
          </Box>
          <FacebookProvider appId="1090833335084068">
            <Comments
              href={`https://lambda.com.pe/blog/${slug}`}
              width="100%"
            />
          </FacebookProvider>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}

const root = process.cwd();
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(root, "src", "data", "post"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join(root, "src", "data", "post", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
    console.log(frontmatter);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

const styles = {
  container: {
    pt: ["140px", "145px", "155px", "170px", null, null, "180px", "215px"],
    pb: [2, null, 0, null, 2, 0, null, 5],
    overflowX: "hidden",
    maxWidth: [
      "100%",
      null,
      null,
      "750px",
      "1000px",
      "1180px",
      null,
      "calc(50% + 865px)",
    ],
  },
};
