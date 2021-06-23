import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

import styles from 'styles/header.module.scss';

const Header = () => {
    const [ session, loading ] = useSession();

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
            {!session && (
                <a onClick={signIn}>Log in</a>
            )}
            {session && (
                <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/item/add">+ Add item</Link>
                </>
            )}
            </div>
            <div className="utility col-sm-4 col-xs-12">
            {session && (
                <>
                <a className={styles.logout} onClick={signOut}>
                    Log out
                    { session && <span> ({session.user.name})</span> }
                </a>
                </>
            )}
            </div>
        </header>
    );
};

export default Header;