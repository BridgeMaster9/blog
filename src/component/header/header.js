import styles from './header.module.scss'
const Header = ()=>{

  return(
    <header className={styles.header}>
      <div className={styles.left}>
        <span>Realworld Blog</span>
      </div>
      <div className={styles.right}>
        <button className={styles.btn} type="button">Sing In</button>
        <button className={styles.btn} type="button">Sing Up</button>
      </div>
    </header>
  )
}

export default Header