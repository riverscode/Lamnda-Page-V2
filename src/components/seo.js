import React from "react";
import Head from "next/head";

export default function SEO({
  description = "Aprende BIM con los mejores cursos online para la industria de la construción.",
  author = "Lambda Ingeniería e Innovación",
  site = "https://lambda.com.pe/",
  meta,
  title = "Lambda Ingenieria e innovacion",
  previewImage = "https://res.cloudinary.com/lambda-ingenier-a-e-innovaci-n/image/upload/v1639282806/imagePrevie_hvtlkq.webp",
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
      {/* <link rel="canonical" href="https://lambda.com.pe"></link> */}
      {/* <meta name="theme-color" content="#13AA52" /> */}
      {/* <meta name="description" content={description} /> */}

      {/* <meta property="og:locale" content="es_ES" /> */}
      {/* <meta property="og:title" content={title} /> */}
      {/* <meta property="og:description" content={description} /> */}
      {/* <meta property="og:type" content="website" /> */}
      <meta property="og:image" content={previewImage} />
      {/* <meta property="og:site_name" content={site} /> */}
      <title>{title}</title>
      {/* <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} /> */}
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
