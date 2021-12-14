import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="es">
        <Head >
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9H70XCYC6K"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9H70XCYC6K', { page_path: window.location.pathname });
            `,
          }}
        />
        </Head>
        {/* <script
        async
          src={`https://www.googletagmanager.com/gtag/js?id=G-9H70XCYC6K`}
        />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9H70XCYC6K', {
              page_path: window.location.pathname,
            });
                `}
        </script> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
