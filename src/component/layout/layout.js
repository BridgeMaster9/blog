import React from 'react'
import {Outlet} from "react-router-dom";
import styles from './layout.module.css'

import Header from '../header'


const Layout = () =>{
  return(
    <>
      <Header/>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <Outlet/>
        </div>

      </main>
      <footer>

      </footer>
    </>
  )
}

export default Layout