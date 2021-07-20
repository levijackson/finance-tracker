import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'src/aws-exports';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

Amplify.configure({ ...awsconfig, ssr: true });

// http://flexboxgrid.com/
import 'src/styles/flexboxgrid.min.css';
import 'src/styles/layout.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [ currentUser, setCurrentUser ] = useState({});

  useEffect(() => {
      Auth.currentAuthenticatedUser()
        .then((userData) => {
          setCurrentUser({
            email: userData.attributes.email,
            username: userData.username,
            uuid: userData.attributes.sub,
            jwtToken: userData.signInUserSession.accessToken.jwtToken
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
  
  return (
    <div className="wrapper">
      <Header user={currentUser} />
      
      <div className="content row">
        <Component {...pageProps} user={currentUser} />
      </div>

      <Footer />
    </div>
  );
}

export default MyApp;
