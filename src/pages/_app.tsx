import type { AppProps } from 'next/app';
import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { amplifyConfiguration } from 'src/helpers/aws';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Nav from 'src/components/Nav';
import NProgress from 'nprogress';

import 'src/styles/nprogress.css';
// http://flexboxgrid.com/
import 'src/styles/flexboxgrid.min.css';
import 'src/styles/layout.css';

Amplify.configure(amplifyConfiguration());

Router.events.on('routeChangeStart', () => {
  NProgress.start()
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
});
Router.events.on('routeChangeError', () => {
  NProgress.done()
});


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
