import React from 'react'
import Link from 'next/link'

import styles from '../styles/layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <div className="grid">
        <header>
          <div className="site-info">
            <Link href="/"><a href="/" className="navbar-brand">Home</a></Link>
          </div>
          <div className="navigation">   
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