import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from 'styles/header.module.scss';

const Header = () => {
    const [ session, loading ] = useSession();

    return (
        <header className="row">
            <div className="navigation col-xs-12">
            <Link href="/">Home</Link>
            {!session && (
                <a onClick={signIn}>Log in</a>
            )}
            {session && (
                <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/item/add">Add item</Link>
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