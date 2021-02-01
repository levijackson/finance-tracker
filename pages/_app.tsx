import type { AppProps } from 'next/app';
import React from 'react';
import Header from 'components/header';
import Footer from 'components/Footer';
import { SWRConfig } from 'swr';;
import fetch from 'lib/fetchJson';

// http://flexboxgrid.com/
import 'styles/flexboxgrid.min.css';
import 'styles/layout.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
        <div className="wrapper">
            <Header />

            <div className="content row">
              <Component {...pageProps} />
            </div>

            <Footer />
          </div>
      </SWRConfig>
  );
}

export default MyApp
