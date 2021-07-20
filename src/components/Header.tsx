import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

import styles from 'src/styles/header.module.scss';

const Header = ({ user }) => {
  return (
    <header className="row">
      <div className="col-sm-1 col-xs-12">
        <Link href="/">
          <a className={styles.logo} title="home">
            <FontAwesomeIcon icon={faDollarSign} />
          </a>
        </Link>
      </div>
      <div className="navigation col-sm-7 col-xs-12">
      {user.email && (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/item/add">+ Add item</Link>
        </>
      )}
      </div>
      <div className="utility col-sm-4 col-xs-12">
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