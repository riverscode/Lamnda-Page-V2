/** @jsx jsx */
import { jsx, Image, Button, Box, Heading, Text, Flex, Link } from "theme-ui";

export default function PostCard({ post }) {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.thumbnail}>
        <Image src={post.frontmatter.cover_image} alt="post image" />
      </Box>

      <Flex sx={styles.postContent}>
        <Heading sx={styles.title}>{post.frontmatter.title}</Heading>
        <Text as="p">{post.frontmatter.excerpt}</Text>
        <Flex sx={styles.postFooter}>
          <Text sx={styles.postFooter.date}>{post.frontmatter.date}</Text>
        </Flex>
        <Link href={`/blog/${post.slug}`}>
          <Button variant="secondary">Leer más</Button>
        </Link>
      </Flex>
    </Box>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(38, 78, 118, 0.3)",
    borderRadius: "5px",
    m: "0 10px 20px",
    transition: "all 0.3s",
  },

  thumbnail: {
    borderRadius: "7px 7px 0 0",
    overflow: "hidden",
    display: "flex",
    img: {
      width: "100%",
    },
  },
  postContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: ["20px 30px", "15px 20px"],
  },
  title: {
    fontSize: [3, null, null, null, null, 4],
    color: "heading",
    lineHeight: [1.4, 1.3],
    fontWeight: 700,
    mb: [3, 3, 3],
    pr: [0, null, null, null, 5],
  },
  postFooter: {
    width: "100%",
    justifyContent: "space-between",
    alignItem: "center",
    date: {
      mt: [2, 3, 4],
      mb: [2, 3, 4],
      fontSize: ["14px", null, "14px"],
      fontWeight: 700,
      lineHeight: 1.5,
    },
  },
};
