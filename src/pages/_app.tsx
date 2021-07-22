import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'src/aws-exports';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Nav from 'src/components/Nav';


const isLocalhost = Boolean(
  process.env.IS_DEV
);

const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsconfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsconfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  },
  ssr: true
}

Amplify.configure(updatedAwsConfig);

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
      
      <div className="main row">
        <Nav user={currentUser} />
        <div className="content col-sm-10 col-xs-12">
          <Component {...pageProps} user={currentUser} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyApp;
