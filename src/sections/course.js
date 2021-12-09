/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";
import SectionHeader from "components/section-header";
import PopularCard from "components/popular-card";

import popularCourseData from "data/course-data";

export default function Course() {
  return (
    <section
      id="course"
      sx={styles.popularCourse}
      sx={{ variant: "section.keyFeature" }}
    >
      <Container>
        <SectionHeader
          slogan="Nuestros cursos"
          title="Cursos cortos, prácticos y especializados."
        />
        {popularCourseData.map((course, index) => (
          <Box sx={styles.popularCourse.col} key={index}>
            <PopularCard
              key={index}
              listData={course.list}
              expanded={course.expanded}
              starCount={course.starCount}
              title={course.title}
              description={course.description}
              reviewCount={course.reviewCount}
              watchCount={course.watchCount}
              videoLink={course.videoLink}
              projectsCount={course.projectsCount}
              hoursCount={course.hoursCount}
            />
          </Box>
        ))}
      </Container>
    </section>
  );
}

const styles = {
  popularCourse: {
    paddingBottom: ["100px"],
    "@media(max-width: 575px)": {
      paddingBottom: "60px",
    },
    blockTitle: {
      textAlign: "center",
      marginBottom: "60px",
      "@media(max-width: 575px)": {
        marginBottom: "30px",
      },
    },
    col: {},
  },
};
