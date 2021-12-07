/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";
import SectionHeader from "components/section-header";
import PopularCard from "components/popular-card";

const popularCourseData = [
  {
    title: "Automatización de procesos con Revit API - Básico",
    description:
      "El curso tiene como objetivo brindar habilidades al estudiante para poder desarrollar aplicaciones. Se abordaran conocimientos basicos de programación y la interacción con la API de Revit mediante el uso del lenguaje C#",
    reviewCount: "5.0",
    watchCount: 63,
    videoLink: "L9jU-IIN0ng",
    starCount: 5,
    projectsCount: 6,
    hoursCount: 24,
    expanded: true,
    list: [
      {
        content: "How to reduce file pixel dimentions without loosing quality",
      },
      {
        content: "How to make logo pixel perfects with different extension",
      },
      {
        content: "Create vector file from restarize layer styles",
      },
      {
        content: "Make color gradient with photoshop build-in tools",
      },
    ],
  },
  {
    title: "Automatización de procesos con Revit API - Intermedio/Avanzado",
    description:
      "Dirigido para aquellos profesionales que tienen conocimientos básicos de programación y quieren llegar al siguiente nivel en el uso de la API de Revit.",
    reviewCount: "4.5",
    watchCount: 86,
    videoLink: "L9jU-IIN0ng",
    starCount: 4,
    projectsCount: 14,
    hoursCount: 36,
    expanded: false,
    list: [
      {
        content: "How to reduce file pixel dimentions without loosing quality",
      },
      {
        content: "How to make logo pixel perfects with different extension",
      },
      {
        content: "Create vector file from restarize layer styles",
      },
      {
        content: "Make color gradient with photoshop build-in tools",
      },
    ],
  },
];

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
