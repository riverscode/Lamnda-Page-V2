/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import Sticky from 'react-stickynode';
import Header from './header/header';
import Footer from './footer/footer';


export default function Layout({ children, isHome = true}) {
  const [isSticky, setIsSticky] = useState(false);
  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    } else if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };
  return (
    <>
      <Sticky innerZ={1001} top={0} onStateChange={handleStateChange}>
        <Header className={`${isSticky ? 'sticky' : 'unSticky'}`} isHome={isHome} />
      </Sticky>
      <main
        id="content"
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
