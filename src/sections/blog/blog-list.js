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
      "750px",
      "1000px",
      "1180px",
      null,
      "calc(50% + 865px)",
    ],
  },
  grid: {
    width: ["100%", "80%", "100%"],
    mx: "auto",
    gridGap: [
      "35px 0",
      null,
      "40px 40px",
      "50px 60px",
      "30px",
      "50px 40px",
      "55px 90px",
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
