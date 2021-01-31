import type { AppProps } from 'next/app'
import React from 'react'
import Link from 'next/link'

// http://flexboxgrid.com/
import 'styles/flexboxgrid.min.css';
import 'styles/layout.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="wrapper">
        <header className="row">
          <div className="navigation col-xs-12 col-sm-6">
            <Link href="/">Home</Link>
            <Link href="/expense/add">Add expense</Link>
            <Link href="/income/add">Add income</Link>
          </div>
        </header>

        <div className="content row">
          <Component {...pageProps} />
        </div>

        <footer className="row">
          <div className="name col-xs-12">
            Finance Tracker <small>{(new Date().getFullYear())}</small>
          </div>
        </footer>
      </div>
  );
}

export default MyApp
