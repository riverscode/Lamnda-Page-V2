import React from "react";
import Head from "next/head";

{
  /* <link rel="canonical" href="https://lambda.com.pe"></link> */
}
{
  /* <meta name="theme-color" content="#13AA52" /> */
}
{
  /* <meta name="description" content={description} /> */
}

{
  /* <meta property="og:locale" content="es_ES" /> */
}
{
  /* <meta property="og:title" content={title} /> */
}
{
  /* <meta property="og:description" content={description} /> */
}
{
  /* <meta property="og:type" content="website" /> */
}
export default function SEO({
  description = "Aprende BIM con los mejores cursos online para la industria de la construción.",
  author = "Lambda Ingeniería e Innovación",
  meta,
  title = "Lambda Ingenieria e innovacion",
}) {
  const metaData = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ].concat(meta);
  return (
    <Head>
      <title>{title}</title>
      {/* <meta property="og:image" content={previewImage} key="ogimage" /> */}
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
};
