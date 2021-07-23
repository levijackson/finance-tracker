import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from 'src/styles/nav.module.scss';

const Nav = ({ user }) => {
  return (
      <nav className={styles.navigation + " col-sm-2 col-xs-12"}>
        <label htmlFor={styles.mobileNavToggle}>&#9776;</label>
        <input type="checkbox" id={styles.mobileNavToggle}/>

        <div className={styles.navItems}>
          {user.email && (
              <>
              <Link href="/dashboard">
                <a>
                  <FontAwesomeIcon icon={faColumns} />
                  Dashboard
                </a>
              </Link>
              <Link href="/item/add">
                <a>
                  <FontAwesomeIcon icon={faPlus} />
                  Add Item
                </a>
              </Link>
              </>
          )}
        </div>
      </nav>
  );
};

export default Nav;