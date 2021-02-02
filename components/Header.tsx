import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

const Header = () => {
    const [ session, loading ] = useSession();

    return (
        <header className="row">
            <div className="navigation col-xs-12 col-sm-8">
            <Link href="/">Home</Link>
            {!session && (
                <a onClick={signIn}>Sign in</a>
            )}
            {session && (
                <>
                <Link href="/expense/add">Add expense</Link>
                <Link href="/income/add">Add income</Link>
                <a className="logout" onClick={signOut}>
                    Sign out
                    { session && <span>({session.user.email})</span> }
                </a>
                </>
            )}
            </div>
        </header>
    );
};

export default Header;