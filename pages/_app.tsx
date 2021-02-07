import type { AppProps } from 'next/app';
import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Provider } from 'next-auth/client'

// http://flexboxgrid.com/
import 'styles/flexboxgrid.min.css';
import 'styles/layout.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
        <div className="wrapper">
                <Header />

                <div className="content row">
                    <Component {...pageProps} />
                </div>

                <Footer />
            </div>
      </Provider>
  );
}

export default MyApp
