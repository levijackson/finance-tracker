import Link from 'next/link';
import { Auth } from 'aws-amplify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

import styles from 'styles/header.module.scss';

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
      {user && (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/item/add">+ Add item</Link>
        </>
      )}
      </div>
      <div className="utility col-sm-4 col-xs-12">
      {user ? (
        <>
          <button className={styles.logout} onClick={() => Auth.signOut()}>Log Out ({user.email})</button>
        </>
      ) :
      // <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
      <button className={styles.login} onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Sign In</button>
      }
      </div>
    </header>
  );
};

export default Header;