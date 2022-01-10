/** @jsx jsx */
import { jsx, Container, Grid } from "theme-ui";

import PostCard from "components/post-card";
import SectionHeader from "components/section-header";

export default function BlogList({ posts }) {
  return (
    <Container sx={styles.container}>
      <SectionHeader
        slogan="Nuestros articulos"
        title="Repositorio de Conocimiento"
      />
      <Grid sx={styles.grid}>
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </Grid>
    </Container>
  );
}

const styles = {
  container: {
    maxWidth: [
      "100%",
      null,
      null,
      "780px",
      "1020px",
      "1200px",
      null,
      "1310px",
    ],
  },
  grid: {
    width: ["100%", "80%", "100%"],
    mx: "auto",
    gridGap: [
      "5px 0",
      null,
      "5px 5px",
      "5px 5px",
      "5px",
      "5px 5px",
      "5px 5px",
    ],
    gridTemplateColumns: [
      "repeat(1,1fr)",
      null,
      "repeat(2,1fr)",
      null,
      "repeat(3,1fr)",
    ],
  },
};
