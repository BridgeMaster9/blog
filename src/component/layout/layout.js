import styles from './layout.module.css'
import ServiceRealworld from '../../services/service-realworld'

import Header from '../header'
import { Outlet } from 'react-router-dom'
import React from 'react'

function Layout() {
  const service = new ServiceRealworld()
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet context={service} />
      </main>
      <footer />
    </>
  )
}

export default Layout
