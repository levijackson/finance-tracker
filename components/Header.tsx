import Link from 'next/link';
import { useRouter } from 'next/router';

import useUser from 'lib/useUser';
import fetchJson from 'lib/fetchJson';

const Header = () => {
    const { user, mutateUser } = useUser();
    const router = useRouter();

    const logout = async (e) => {
        e.preventDefault();
        await mutateUser(
            fetchJson('/api/logout', { method: "POST" })
        );
        router.push('/');
    };

    return (
        <header className="row">
            <div className="navigation col-xs-12 col-sm-6">
            <Link href="/">Home</Link>
            {!user?.isLoggedIn && (
                <Link href="/login">Login</Link>
            )}
            {user?.isLoggedIn && (
                <>
                <Link href="/expense/add">Add expense</Link>
                <Link href="/income/add">Add income</Link>
                <a onClick={logout}>Logout</a>
                </>
            )}
            </div>
        </header>
    );
};

export default Header;