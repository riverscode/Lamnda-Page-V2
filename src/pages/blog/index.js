import { ThemeProvider } from "theme-ui";
import theme from "theme";
import Layout from "components/layout";
import { StickyProvider } from "contexts/app/app.provider";
import { VideoProvider } from "contexts/video/video.provider";
import SEO from "components/seo";

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from 'components/post'
import { sortByDate } from 'utils'
// import BlogList from "sections/blog/blog-list";



export default function BlogPage({ posts }) {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <VideoProvider>
          <Layout isHome={false}>
            <SEO title="Blog - Lamda Ingeniería & Innovación" />
            
            <div>
              {posts.map((post, index) => (
                <Post key={index} post={post} />
              ))}
            </div>

            {/* <BlogList /> */}
          </Layout>
        </VideoProvider>
      </StickyProvider>
    </ThemeProvider>
  );
}


export async function getStaticProps() {
  const root = process.cwd();
  // Get files from the posts dir
  const files = fs.readdirSync(path.join(root,'src','data','post'))

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join(root,'src','data','post', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}