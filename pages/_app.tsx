import type { AppProps } from 'next/app';
import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

// http://flexboxgrid.com/
import 'styles/flexboxgrid.min.css';
import 'styles/layout.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className="wrapper">
              <Header />

              <div className="content row">
                  <Component {...pageProps} />
              </div>

              <Footer />
          </div>
  );
}

export default withAuthenticator(MyApp);
