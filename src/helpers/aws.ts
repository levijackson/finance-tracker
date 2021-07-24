import awsConfig from 'src/aws-exports';

/**
 * Config for Amplify
 * 
 * @returns object
 */
const amplifyConfiguration = () => {
  const isLocalhost = Boolean(
    process.env.IS_DEV
  );

  const [
    localRedirectSignIn,
    productionRedirectSignIn,
  ] = awsConfig.oauth.redirectSignIn.split(",");
  
  const [
    localRedirectSignOut,
    productionRedirectSignOut,
  ] = awsConfig.oauth.redirectSignOut.split(",");
  
  return {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
        redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    },
    ssr: true
  }
};

export {
  amplifyConfiguration
}