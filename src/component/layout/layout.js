import React from 'react'
import {Outlet} from "react-router-dom";
import styles from './layout.module.css'
import serviceRealworld from "../../services/service-realworld";

import Header from '../header'


const Layout = () =>{
  const service = new serviceRealworld()
  return(
    <>
      <Header/>
      <main className={styles.main}>
        <Outlet context={service}/>
      </main>
      <footer>

      </footer>
    </>
  )
}

export default Layout