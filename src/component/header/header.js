import styles from './header.module.scss'
import defAvatar from './avatar.png'
import { setAuth, setUser, setLogin } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { setCookie } from 'react-use-cookie'

function Header() {
  const login = useSelector((state) => state.mode.login)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logOut = () => {
    setCookie('Token', '')
    dispatch(setLogin(false))
    dispatch(setAuth(false))
    dispatch(setUser(null))
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/">
          <span>Realworld Blog</span>
        </Link>
      </div>
      <div className={styles.right}>
        {login ? (
          <>
            <Link to="/new-article">
              <button className={`${styles.btn} ${styles['btn-article']}`} type="button">
                Create article
              </button>
            </Link>
            <div className={styles.avatar}>
              <Link to="/profile">
                <img src={user.image || defAvatar} alt="avatar" />
              </Link>
            </div>
            <button className={styles.btn} onClick={logOut} type="button">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button className={styles.btn} type="button">
                Sing In
              </button>
            </Link>
            <Link to="/signup">
              <button className={styles.btn} type="button">
                Sing Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
