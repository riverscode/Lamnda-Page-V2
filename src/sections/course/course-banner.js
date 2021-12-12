/** @jsx jsx */
import {
  jsx,
  Box,
  Flex,
  Container,
  Image,
  Heading,
  Text,
  Button,
} from "theme-ui";

import BannerCourse from "assets/banner-course.png";

const CourseBanner = () => {
  return (
    <Box as="section" id="banner" sx={styles.banner}>
      <Container sx={styles.banner.container}>
        <Flex sx={styles.banner.row}>
          <Box sx={styles.banner.col}>
            <Box sx={styles.banner.content}>
              <Heading as="h1">
                Somos más que videos, construimos educación de calidad
              </Heading>
              <Text as="p">
                Los cursos más innovadores del sector construcción. Aprende con
                profesionales de años de experiencia y tranforma tu carrera.
              </Text>
              <a href="https://cutt.ly/4YmUHmE" target="_blank" rel="noopener">
                <Button
                  className="donate__btn"
                  variant="secondary"
                  aria-label="Contactanos"
                >
                  Contactanos
                </Button>
              </a>
            </Box>
          </Box>
          <Box sx={styles.banner.col}>
            <Box sx={styles.banner.imageBox}>
              <Image src={BannerCourse} alt="banner image" />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default CourseBanner;

const styles = {
  banner: {
    overflowX: "hidden",
    pt: ["140px", "145px", "155px", "170px", null, null, "180px", "215px"],
    paddingBottom: ["0px", null, "80px"],
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
      mx: "auto",
      mb: ["40px", null, null, null, null, 7],
    },
    row: {
      flexWrap: "wrap",
      display: "flex",
      marginLeft: "-15px",
      marginRight: "-15px",
    },
    col: {
      pl: "15px",
      pr: "15px",
      flex: ["1 1 100%", null, "0 0 50%"],
    },
    content: {
      paddingRight: [0, 0, 0, 0, "40px", 0, 0],
      h1: {
        lineHeight: 1.18,
        color: "black",
        fontWeight: "bold",
        position: "relative",
        width: "100%",
        fontSize: ["30px", "35px", "35px", "35px", null, "40px", "45px"],
        maxWidth: ["500px", null, null, null, null, null, "100%"],
        "&:before": {
          content: '""',
          width: ["290px", null, null, null, null, "260px", "381px"],
          height: "15px",
          position: "absolute",
          bottom: "-15px",
          right: ["15px", null, null, null, null, "140px", "100px"],
          display: ["none", null, null, null, null, "block"],
        },
      },
      p: {
        lineHeight: 2.33,
        color: "#02073E",
        marginTop: ["10px", null, null, "35px"],
        fontSize: ["15px", "18px"],
        pr: ["15px", 0],
        br: {
          display: ["none", null, null, null, null, "block"],
        },
      },
    },
    imageBox: {
      display: "flex",
      justifyContent: ["flex-start", null, null, "flex-end"],
      marginTop: ["60px", null, null, "0"],
    },
  },
};
