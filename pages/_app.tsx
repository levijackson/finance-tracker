import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'src/aws-exports';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

// http://flexboxgrid.com/
import 'styles/flexboxgrid.min.css';
import 'styles/layout.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((userData) => {
        setCurrentUser({
          email: userData.attributes.email,
          username: userData.username,
          uuid: userData.attributes.sub
        });
    });
  }, []);
  
  return (
      <div className="wrapper">
              <Header user={currentUser} />

              <div className="content row">
                  <Component {...pageProps} />
              </div>

              <Footer />
          </div>
  );
}

export default withAuthenticator(MyApp);
