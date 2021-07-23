import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import styles from 'src/styles/header.module.scss';

const Header = ({ user }) => {
  return (
    <header className={styles.wrapper + " row"}>
      <div className="col-sm-4 col-xs-6">
        <Link href="/">
          <a className={styles.logo} title="home">
            <FontAwesomeIcon icon={faDollarSign} />
          </a>
        </Link>
        <span className={styles.siteName}>Finance Tracker</span>
      </div>
      <div className={styles.utility + " col-sm-8 col-xs-6 end-sm"}>
      {user.email ? (
        <>
          <button className={styles.logout} onClick={() => Auth.signOut()}>Log Out ({user.email})</button>
        </>
      ) :
      <button className={styles.login} onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>Sign In</button>
      }
      </div>
    </header>
  );
};

export default Header;