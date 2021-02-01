import Link from 'next/link';

const Header = () => {
    return (
        <header className="row">
            <div className="navigation col-xs-12 col-sm-6">
            <Link href="/">Home</Link>
            <Link href="/expense/add">Add expense</Link>
            <Link href="/income/add">Add income</Link>
            <Link href="/login">Login</Link>
            <Link href="/logout">Logout</Link>
            </div>
        </header>
    );
};

export default Header;