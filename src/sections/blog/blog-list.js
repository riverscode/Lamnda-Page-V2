import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from 'components/post'
import { sortByDate } from 'utils'


export default function BlogList({ posts }){
    return<div>
    {posts.map((post, index) => (
      <Post key={index} post={post} />
    ))}
  </div>
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