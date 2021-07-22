import Link from 'next/link';

import styles from 'src/styles/nav.module.scss';

const Nav = ({ user }) => {
  return (
      <nav className="navigation col-sm-2 col-xs-12">
        <div className={styles.navItems}>
          {user.email && (
              <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/item/add">Add Item</Link>
              </>
          )}
        </div>
      </nav>
  );
};

export default Nav;