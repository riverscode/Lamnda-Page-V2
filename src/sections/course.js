/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";
import SectionHeader from "components/section-header";
import PopularCard from "components/popular-card";

const popularCourseData = [
  {
    title: "Automatización de procesos con Revit API - Básico",
    description:
      "Crea tus primeras aplicaciones con la API de Revit sin conocimiento en programación.",
    reviewCount: "5.0",
    watchCount: 85,
    videoLink: "L9jU-IIN0ng",
    starCount: 5,
    projectsCount: 6,
    hoursCount: 24,
    expanded: true,
    list: [
      {
        content: "Aprende los conceptoos basicos de la POO.",
      },
      {
        content: "Comprende como funciona la API de Revit.",
      },
      {
        content: "Automatiza la gestion de Informacion de Revit.",
      },
      {
        content: "Crea tus primeras aplicaciones con la API de Revit.",
      },
    ],
  },
  {
    title: "Automatización de procesos con Revit API - Intermedio/Avanzado",
    description:
      "Lleva tus conocimientos al siguiente nivel con proyectos reales.",
    reviewCount: "4.5",
    watchCount: 42,
    videoLink: "L9jU-IIN0ng",
    starCount: 4,
    projectsCount: 14,
    hoursCount: 36,
    expanded: false,
    list: [
      {
        content: "Comprende el proceso global del desarrollo de aplicaicones BIM.",
      },
      {
        content: "Aplica tus conocimientos con proyectos reales.",
      },
      {
        content: "Lleva al siguiente nivel el interfaz de tus aplicaciones.",
      },
      {
        content: "Publica tus aplicaciones en Autodesk Store.",
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
