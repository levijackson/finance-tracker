import React from 'react'
import Link from 'next/link'

import styles from '../styles/layout.module.scss';

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.navigation}>
            <Link href="/">Home</Link>
            <Link href="/expense/add">Add expense</Link>
            <Link href="/income/add">Add income</Link>
          </div>
        </header>

        <div className="content">
          {children}
        </div>

        <footer>
          <div className="name">
            Finance Tracker <small>{(new Date().getFullYear())}</small>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout;