/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Grid } from "theme-ui";
import SectionHeader from "../components/section-header";
import FeatureCardColumn from "components/feature-card-column.js";

import SoporteContinuo from "assets/key-feature/soporte-continuo.svg";
import ProfesionalesExperiencia from "assets/key-feature/profesionales-experiencia.svg";
import CursosInnovadores from "../assets/key-feature/cursos-innovadores.svg";
import ContenidoEstructurado from "../assets/key-feature/contenido-estructurado.svg";

const data = [
  {
    id: 1,
    imgSrc: SoporteContinuo,
    altText: "Soporte continuo",
    title: "Soporte continuo",
    text: "Soporte rápido y amigable para preguntas y respuestas.",
  },
  {
    id: 2,
    imgSrc: ProfesionalesExperiencia,
    altText: "Experiencia",
    title: "Experiencia",
    text: "Años de trabajo en grandes empresas y grandes proyectos.",
  },
  {
    id: 3,
    imgSrc: CursosInnovadores,
    altText: "Cursos innovadores",
    title: "Cursos innovadores",
    text: "Nuestros cursos están enfocados a realizar un cambio disruptivos en la industria aumentando la productividad.",
  },
  {
    id: 4,
    imgSrc: ContenidoEstructurado,
    altText: "Contenido estructurado",
    title: "Contenido Estructurado",
    text: "Contenido estructurado para cumplir objetivos enfocados en metodologías de educación.",
  },
];

export default function KeyFeature() {
  return (
    <section sx={{ variant: "section.keyFeature" }} id="feature">
      <Container>
        <SectionHeader
          slogan="¿Quienes somos?"
          title="Nos diferenciamos por nuestros valores"
        />

        <Grid sx={styles.grid}>
          {data.map((item) => (
            <FeatureCardColumn
              key={item.id}
              src={item.imgSrc}
              alt={item.altText}
              title={item.title}
              text={item.text}
            />
          ))}
        </Grid>
      </Container>
    </section>
  );
}

const styles = {
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
      "repeat(4,1fr)",
    ],
  },
};
