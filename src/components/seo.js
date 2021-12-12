import React from "react";
import Head from "next/head";

export default function SEO({
  description = "Aprende BIM con los mejores cursos online para la industria de la construción.",
  site = "https://lambda.com.pe/",
  title = "Lambda Ingenieria e innovacion",
  previewImage = "https://res.cloudinary.com/lambda-ingenier-a-e-innovaci-n/image/upload/v1639282806/imagePrevie_hvtlkq.webp",
}) {
  return (
    <Head>
      <link rel="canonical" href="https://lambda.com.pe"></link>
      <meta name="theme-color" content="#13AA52" />
      <meta name="description" content={description} />

      <meta property="og:locale" content="es_ES" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={previewImage} />
      <meta property="og:site_name" content={site} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} />

      <title>{title}</title>
    </Head>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
};
