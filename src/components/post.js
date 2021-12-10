
/** @jsx jsx */
import { jsx, Link, Button } from "theme-ui";

export default function Post({ post }) {
  return (
    <div className='card'>
      <img src={post.frontmatter.cover_image} alt='' />

      <div className='post-date'>Publicado en {post.frontmatter.date}</div>

      <h3>{post.frontmatter.title}</h3>

      <p>{post.frontmatter.excerpt}</p>
      <Link href={`/blog/${post.slug}`}>
            <Button variant="primary">Nuestros Cursos</Button>
      </Link>
    </div>
  )
}