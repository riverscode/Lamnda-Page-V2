import { useEffect } from "react";
import Router from "next/router";
import { initGA, logPageView } from "analytics";
import "react-multi-carousel/lib/styles.css";
import "react-modal-video/css/modal-video.min.css";
import "rc-drawer/assets/index.css";
import "highlight.js/styles/xcode.css";
import "assets/css/styles.css";
import "typeface-dm-sans";
import ReactGa from 'react-ga'

export default function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGa.initialize('G-9H70XCYC6K');
    ReactGa.pageview('/')
    // initGA();
    // logPageView();
    // Router.events.on("routeChangeComplete", logPageView);
  }, []);


  return (
    <>
    {/* <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script> */}
      <Component {...pageProps} />;
    </>
  );
}
